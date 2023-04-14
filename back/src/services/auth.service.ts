import jwt from "jsonwebtoken";
import NodeCache from "node-cache";

import userModel from "../models/user.model.js";
import * as emailService from "./mail.service.js";
import config from "../config/env.js";
import User from "../types/user.type.js";
import {ObjectId} from "mongoose";

const emailSentCache = new NodeCache({stdTTL: config.login_jwt_expiration, checkperiod: config.login_jwt_expiration + 10});

/**
 * Request a connection token email for a user
 * @param {string} email The user's email
 * @returns {number} 0 if the email was sent, 1 if the user already requested a connection token recently
 */
export async function requestEmail(email: string): Promise<{ code: number, isRegistration: boolean }> {

    const connectionToken = getConnectionTokenFromEmail(email);
    const userDoc = await userModel.findOne({email: email});

    const isEmailPresent = emailSentCache.get<string>(email);
    if (isEmailPresent && ((new Date().getTime() - new Date(isEmailPresent).getTime()) / 1000 < config.login_jwt_expiration)) {
        return {code: 1, isRegistration: !userDoc};
    }

    await emailService.sendConnectionEmail(email, connectionToken, !userDoc);
    emailSentCache.set(email, new Date().toString());

    return {code: 0, isRegistration: !userDoc};
}

/**
 * Generate a connection token for a user
 * @param {string} email The user's email
 * @returns {string} The user's connection token
 */
export function getConnectionTokenFromEmail(email: string): string {

    return jwt.sign({email: email}, config.login_jwt_secret, {expiresIn: config.login_jwt_expiration});
}

/**
 * Use given code to generate a real token, and invalidate the code
 * @param {string} code The code to use
 * @returns {token: string, isFirstLogin: boolean} The new token
 */
export async function useCode(code: string): Promise<{ token: string, isFirstLogin: boolean }> {
    try {
    const email: string = jwt.verify(code, config.login_jwt_secret, {ignoreExpiration: false})["email"];
    if (email && email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {

        emailSentCache.del(email);

        const existingUserDoc = await userModel.findOne({email: email});
        console.log("Auth")
        if (existingUserDoc) {
            const token = await generateToken(existingUserDoc._id);
            await userModel.findByIdAndUpdate(existingUserDoc._id, {token: token});
            return {token: token, isFirstLogin: false};
        } else {
            const user = await userModel.create({email: email});
            const token = await generateToken(user._id);
            await userModel.findByIdAndUpdate(user._id, {token: token});
            return {token: token, isFirstLogin: true};
        }
    }
    } catch (e) {
        if (e.message === "jwt expired") {
            throw new Error("jwt expired");
        } else if (e.message === "jwt malformed") {
            throw new Error("Invalid code");
        } else {
            throw new Error(e.message);
        }
    }
    throw new Error("Invalid code");
}

/**
 * Generate token for a user
 * @param {any} id The user's id
 * @returns {string} The new token
 */
async function generateToken(id: any): Promise<string> {

    return jwt.sign({id: id}, config.jwt_secret, {expiresIn: config.jwt_expiration});
}

/**
 * Get the user from a jwt token
 * @param {string} token The token to use
 * @returns {User} The user
 * @throws {Error} If the user is not found or the token is invalid
 */
export async function getUserFromToken(token: string): Promise<User> {

    const decoded = await jwt.verify(token, config.jwt_secret);

    const userDoc = await userModel.findById(decoded["id"]);

    if (!userDoc) {
        throw new Error("No user found");
    }

    return User.fromModel(userDoc);
}
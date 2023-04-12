import {nanoid} from "nanoid";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import * as emailService from "./mail.service.js";
import config from "../config/env.js";
import User from "../types/user.type.js";

/**
 * Request a connection token email for a user
 * @param {string} email The user's email
 * @returns {number} 0 if the email was sent, 1 if the user already requested a connection token recently
 */
export async function requestEmail(email: string): Promise<{ code: number, isRegistration: boolean }> {

    const oldUser = await userModel.findOne({email: email});
    const connectionToken = await getConnectionTokenFromEmail(email);

    if (oldUser) {
        const oldUserType = User.fromModel(oldUser);
        if (oldUserType.connectionToken === connectionToken) {
            return {code: 1, isRegistration: !oldUserType.lastSuccessfulConnection};
        }
        if (oldUserType.lastSuccessfulConnection) {
            await emailService.sendConnectionEmail(email, connectionToken, false);
            return {code: 0, isRegistration: false};
        }
    }

    await emailService.sendConnectionEmail(email, connectionToken, true);

    return {code: 0, isRegistration: true};
}

/**
 * Generate a connection token for a user
 * @param {string} email The user's email
 * @returns {string} The user's connection token
 */
export async function getConnectionTokenFromEmail(email: string): Promise<string> {

    const token = nanoid(32);
    const userDoc = await userModel.findOne({email: email});

    if (userDoc) {
        const user = User.fromModel(userDoc);

        if (user.lastConnectionRequest && (Date.now() - user.lastConnectionRequest.getTime() < config.loginTokenExpiration)) {
            return user.connectionToken;
        }

        await userModel.updateOne({email: email}, {connectionToken: token, lastConnectionRequest: new Date()});
    } else {

        const user = new User();
        user.email = email;
        user.connectionToken = token;
        user.lastConnectionRequest = new Date();
        await userModel.create(user);
    }
    return token;
}

/**
 * Use given code to generate a real token, and invalidate the code
 * @param {string} code The code to use
 * @returns {token: string, isFirstLogin: boolean} The new token
 */
export async function useCode(code: string): Promise<{ token: string, isFirstLogin: boolean }> {

    const userDoc = await userModel.findOne({connectionToken: code});

    if (!userDoc) {
        throw new Error("Invalid code");
    }

    const user = User.fromModel(userDoc);

    const firstLogin = !user.lastSuccessfulConnection;
    const token = await resetToken(user.id);

    await userModel.findByIdAndUpdate(user.id, {connectionToken: null, lastConnectionRequest: null});

    return {token: token, isFirstLogin: firstLogin};
}

/**
 * Reset the token of a user
 * @param {number} id The user's id
 * @returns {string} The new token
 */
async function resetToken(id: number): Promise<string> {

    const userDoc = await userModel.findById(id);

    if (!userDoc) {
        throw new Error("No user found");
    }

    const user = User.fromModel(userDoc);

    const token = jwt.sign({id: user.id}, config.jwt_secret, {expiresIn: config.jwt_expiration});

    await userModel.findByIdAndUpdate(id, {lastSuccessfulConnection: new Date()});

    return token;
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
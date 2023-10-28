import jwt from "jsonwebtoken";
import NodeCache from "node-cache";

import userModel from "../models/user.model.js";
import * as emailService from "./mail.service.js";
import config from "../config/config.js";
import User from "../classes/user.class.js";
import {getDiscordName} from "./account.service.js";

/**
 * A cache used to store addresses that have already requested a connection token recently.
 *
 * This is used to prevent spamming the server with connection token requests.
 */
const emailSentCache = new NodeCache({stdTTL: config.login_jwt_expiration, checkperiod: config.login_jwt_expiration + 10});

/**
 * Request a connection token email for a user.
 *
 * Check if no email was recently sent to the passed email, generate the connection token using {@link getConnectionTokenFromEmail} and send it using {@link emailService.sendConnectionEmail}.
 * @param {string} email The user's email
 * @param {?string} discordId The user's discord id (optional)
 * @returns {number} 0 if the email was sent, 1 if the user already requested a connection token recently
 */
export async function requestEmail(email: string, discordId?: string): Promise<{ code: number, isRegistration: boolean }> {

    const userDoc = await userModel.findOne({email: email});

    const isEmailPresent = emailSentCache.get<string>(email);
    if (isEmailPresent && ((new Date().getTime() - new Date(isEmailPresent).getTime()) / 1000 < config.login_jwt_expiration)) {
        return {code: 1, isRegistration: !userDoc};
    }

    if (discordId) {
        if (userDoc && User.fromModel(userDoc).discordId) {
            return {code: 2, isRegistration: false};
        }
        const discordUser = await userModel.findOne({discordId: discordId});
        if (discordUser) {
            return {code: 3, isRegistration: !userDoc};
        }
    }

    emailSentCache.set(email, new Date().toString());

    emailService.sendConnectionEmail(email, getConnectionTokenFromEmail(email, discordId), !userDoc);

    return {code: 0, isRegistration: !userDoc};
}

/**
 * Generate a connection token for a user using jwt. The token's payload is the user's email.
 * @param {string} email The user's email
 * @param {?string} discordId The user's discord id (optional)
 * @returns {string} The user's connection token
 */
export function getConnectionTokenFromEmail(email: string, discordId?: string): string {
    console.log("Generating connection token for " + email + " with discord id " + discordId);

    const payload = discordId ? {email: email, discordId: discordId} : {email: email};

    return jwt.sign(payload, config.login_jwt_secret, {expiresIn: config.login_jwt_expiration});
}

/**
 * Use given connection token to generate a real token.
 *
 * get the user's email from the token, check if the email is valid, remove the email from the cache, check if the user already exists, if not create it,
 * generate a token using {@link generateToken} and return it.
 *
 * @param {string} connectionToken The code to use
 * @returns {token: string, isFirstLogin: boolean} The new token and a boolean indicating if the user is logging in for the first time
 * @throws {Error} If the token is invalid or expired
 */
export async function useCode(connectionToken: string): Promise<{ token: string, isFirstLogin: boolean, discordUsername?: string }> {
    try {
        const decodedToken = jwt.verify(connectionToken, config.login_jwt_secret, {ignoreExpiration: false});
        const email: string = decodedToken["email"];
        const discordId: string = decodedToken["discordId"];
        let discordUsername: string;
        emailSentCache.del(email);

        const existingUserDoc = await userModel.findOne({email: email});
        if (existingUserDoc) {
            const token = await generateToken(existingUserDoc._id);
            if (discordId) discordUsername = await addDiscordData(existingUserDoc._id, discordId);
            return {token: token, isFirstLogin: false, discordUsername: discordUsername};
        } else {
            const user = await userModel.create({email: email});
            const token = await generateToken(user._id);
            if (discordId) discordUsername = await addDiscordData(user._id, discordId);
            return {token: token, isFirstLogin: true, discordUsername: discordUsername};
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
}

/**
 * Generate token for a user using jwt. The token's payload is the passed id.
 * @param {any} id The user's id
 * @returns {string} The new token
 */
export async function generateToken(id: any): Promise<string> {

    return jwt.sign({id: id}, config.jwt_secret, {expiresIn: config.jwt_expiration});
}

/**
 * Get the user from a jwt token.
 *
 * Get the user's id from the token, check if the user exists, if not throw an error, else return the user.
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

/**
 * Get the user from a jwt token with discord id.
 *
 * Get the user's discord id from the token, check if the user exists, if not throw an error, else return the user.
 * @param {string} token The token to use
 * @returns {User} The user
 * @throws {Error} If the user is not found or the token is invalid
 */
export async function getUserFromDiscordToken(token: string): Promise<User> {

    const decoded = await jwt.verify(token, config.jwt_secret);

    const userDoc = await userModel.findOne({discordId: decoded["discordId"]});

    if (!userDoc) {
        throw new Error("No user found");
    }

    return User.fromModel(userDoc);
}

/**
 * Add discord infos to a user.
 * @param userId The user's id
 * @param discordId The user's discord id
 */
export async function addDiscordData(userId: any, discordId: string): Promise<string> {

    return getDiscordName(User.fromModel(await userModel.findByIdAndUpdate(userId, {discordId: discordId})));
}
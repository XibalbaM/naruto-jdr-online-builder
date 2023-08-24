import {ObjectId} from "mongoose";
import {Routes} from "discord-api-types/v10";
import {makeURLSearchParams, REST} from "@discordjs/rest";

import userModel from "../models/user.model.js";
import config from "../config/config.js";
import User from "../classes/user.class.js";

/**
 * Change the username of the user
 * @param id The id of the user
 * @param username The new username
 */
export async function updateUsername(id: ObjectId, username: string) {

    await userModel.findByIdAndUpdate(id, {username: username});
}

/**
 * Change the email of the user
 * @param id The id of the user
 * @param email The new email
 */
export async function updateEmail(id: ObjectId, email: string) {

    await userModel.findByIdAndUpdate(id, {email: email});
}

/**
 * Change the profile picture of the user
 * @param id The id of the user
 * @param link The link to the new profile picture
 */
export async function updatePicture(id: ObjectId, link: string) {

    await userModel.findByIdAndUpdate(id, {profileImage: link});
}

/**
 * Remove the profile picture of the user
 * @param id The id of the user
 */
export async function deletePicture(id: ObjectId) {

    await userModel.findByIdAndUpdate(id, {$unset: {profileImage: 1}});
}

/**
 * Delete the account of the user
 * WARNING: This will delete all the data of the user, NOT REVERSIBLE, NO BACKUP
 * @param id The id of the user
 */
export async function deleteAccount(id: ObjectId) {
    await userModel.findByIdAndDelete(id);
}

/**
 * Get the username from the email
 *
 * Get the user from the database and return its username if it exists, else return "Ninja Sans Nom"
 * @param email The email of the user
 * @returns The username of the user
 */
export async function getUserNameFromEmail(email: string): Promise<string> {
    const user = await userModel.findOne({email: email});
    if (!user) return "No user";
    if (user.username) return user.username;
    else return "Ninja Sans Nom";
}

/**
 * Add a discord account to the user
 * @param userId The id of the user
 * @param discordCode The authorization code from discord
 * @returns The username of the user
 */
export async function addDiscordAccount(userId: ObjectId, discordCode: string): Promise<string> {

    if (User.fromModel(await userModel.findById(userId)).discordId) throw new Error("User already has a discord account");

    const body = makeURLSearchParams({
        client_id: config.discord.clientId,
        client_secret: config.discord.clientSecret,
        grant_type: "authorization_code",
        code: discordCode,
        redirect_uri: config.discord.redirectUri,
        scope: "identify"
    })
    const token = (await config.discord.rest.post(Routes.oauth2TokenExchange(), {body: body.toString(), passThroughBody: true, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}))["access_token"];
    if (!token) throw new Error("Invalid code");

    const clientRest = new REST({version: "10", authPrefix: "Bearer"}).setToken(token);
    const discordUser = await clientRest.get(Routes.user("@me"));
    if (await userModel.findOne({discordId: discordUser['id']})) throw new Error("Discord account already linked to another user");

    return getDiscordName(User.fromModel(await userModel.findByIdAndUpdate(userId, {discordId: discordUser['id']})));
}

export async function removeDiscordAccount(userId: ObjectId): Promise<void> {
    if (!User.fromModel(await userModel.findById(userId)).discordId) throw new Error("User does not have a discord account");

    await userModel.findByIdAndUpdate(userId, {$unset: {discordId: 1}});
}

export async function getDiscordName(user: User): Promise<string> {
    if (!User.fromModel(await userModel.findById(user._id)).discordId) throw new Error("User does not have a discord account");

    const discordId = User.fromModel(await userModel.findById(user._id)).discordId;

    const discordMember = await config.discord.rest.get(Routes.guildMember(config.discord.guildId, discordId));

    if (discordMember && discordMember['nick'])
        return discordMember['nick'];

    const discordUser = await config.discord.rest.get(Routes.user(discordId));
    return discordUser['username'];
}

export async function getDiscordPicture(user: User): Promise<string> {
    if (!User.fromModel(await userModel.findById(user._id)).discordId) throw new Error("User does not have a discord account");

    const discordId = User.fromModel(await userModel.findById(user._id)).discordId;

    const guildUser = await config.discord.rest.get(Routes.guildMember(config.discord.guildId, discordId));
    if (guildUser['avatar'])
        return `https://cdn.discordapp.com/avatars/${user.discordId}/${guildUser['avatar']}?size=`;

    const discordUser = await config.discord.rest.get(Routes.user(discordId));
    return `https://cdn.discordapp.com/avatars/${user.discordId}/${discordUser['avatar']}?size=`;
}
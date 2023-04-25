import {ObjectId} from "mongoose";

import userModel from "../models/user.model.js";

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
    if (user && user.username) return user.username;
    else return "Ninja Sans Nom";
}
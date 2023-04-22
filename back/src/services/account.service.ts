import {ObjectId} from "mongoose";

import userModel from "../models/user.model.js";

export async function updateUsername(id: ObjectId, username: string) {

    await userModel.findByIdAndUpdate(id, {username: username});
}

export async function updateEmail(id: ObjectId, email: string) {

    await userModel.findByIdAndUpdate(id, {email: email});
}

export async function updatePicture(id: ObjectId, link: string) {

    await userModel.findByIdAndUpdate(id, {profileImage: link});
}

export async function deletePicture(id: ObjectId) {

    await userModel.findByIdAndUpdate(id, {$unset: {profileImage: 1}});
}
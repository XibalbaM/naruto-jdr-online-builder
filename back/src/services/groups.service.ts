import {ObjectId} from "mongoose";

import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";
import Group from "../classes/group.class.js";

export async function create(data: any, userId: ObjectId) {

    if (await GroupModel.exists({name: data["name"]}))
        throw new Error("Group already exists");

    const group = Group.fromModel(await GroupModel.create({
        ...Group.fromModel(data),
        users: [{role: "sensei", user: await UserModel.findById(userId)}]
    }))

    await UserModel.findByIdAndUpdate(userId, {$push: {groups: {name: data["name"], role: "sensei", _id: group._id}}});

    return group;
}

export async function discordSelect(userId: ObjectId, groupId: ObjectId) {

    if (!await GroupModel.exists({_id: groupId}))
        throw new Error("Group not found");

    await UserModel.findByIdAndUpdate(userId, {$set: {discordSelectedGroup: groupId}});
}
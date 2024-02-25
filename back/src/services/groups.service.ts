import {Types, ObjectId} from "mongoose";

import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";
import Group from "../classes/group.class.js";
import User from "../classes/user.class.js";

export async function create(data: any, userId: ObjectId) {

    if (await GroupModel.exists({name: data["name"]}))
        throw new Error("Group already exists");

    const group = Group.fromModel(await GroupModel.create({
        ...Group.fromModel(data),
        users: [{role: "sensei", user: await UserModel.findById(userId).lean()}]
    }))

    await UserModel.findByIdAndUpdate(userId, {$push: {groups: {name: data["name"], role: "sensei", _id: group._id}}});

    return group;
}

export async function getAll(user: User) {
    const groups: Group[] = [];
    for (let group of user.groups) {
        groups.push(Group.fromModel(await GroupModel.findById(group).lean()));
    }
    return groups;
}

export async function getOne(groupId: string) {
    if (!Types.ObjectId.isValid(groupId))
        throw new Error("Invalid group id");
    const docGroup = await GroupModel.findById(groupId).lean();
    if (!docGroup)
        throw new Error("Group not found");
    return Group.fromModel(docGroup);
}

export async function discordSelect(userId: ObjectId, groupId: ObjectId) {

    if (!await GroupModel.exists({_id: groupId}))
        throw new Error("Group not found");

    await UserModel.findByIdAndUpdate(userId, {$set: {discordSelectedGroup: groupId}});
}
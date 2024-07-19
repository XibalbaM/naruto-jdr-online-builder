import {Types} from "mongoose";

import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";
import Group from "../interfaces/group.interface";
import User from "../interfaces/user.interface";

export async function create(data: any, userId: string) {

    if (await GroupModel.exists({name: data["name"]}))
        throw new Error("Group already exists");

    const group = await GroupModel.create({
        ...data,
        users: [{role: "sensei", user: await UserModel.findById(userId).lean()}]
    } as Partial<Group>)

    await UserModel.findByIdAndUpdate(userId, {$push: {groups: {name: data["name"], role: "sensei", _id: group._id}}}).lean();

    return group;
}

export async function getAll(user: User) {
    const groups: Group[] = [];
    for (let group of user.groups) {
        groups.push((await GroupModel.findById(group).lean())!);
    }
    return groups;
}

export async function getOne(groupId: string) {
    if (!Types.ObjectId.isValid(groupId))
        throw new Error("Invalid group id");
    const docGroup = await GroupModel.findById(groupId).lean();
    if (!docGroup)
        throw new Error("Group not found");
    return docGroup;
}

export async function discordSelect(user: User, groupId: string) {

    if (!await GroupModel.exists({_id: groupId}))
        throw new Error("Group not found");

    await UserModel.findByIdAndUpdate(user._id, {$set: {discordSelectedGroup: groupId}});
}
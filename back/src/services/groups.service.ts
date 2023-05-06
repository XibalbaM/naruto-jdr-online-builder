import {ObjectId} from "mongoose";

import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";
import Group from "../classes/group.class.js";

export async function create(name: string, userId: ObjectId) {

    if (await GroupModel.exists({name: name}))
        throw new Error("Group already exists");

    const group = Group.fromModel(await GroupModel.create({
        name: name,
        users: [{role: "sensei", user: await UserModel.findById(userId)}]
    }))

    await UserModel.findByIdAndUpdate(userId, {$push: {groups: {name: name, role: "sensei", _id: group._id}}});

    return group;
}
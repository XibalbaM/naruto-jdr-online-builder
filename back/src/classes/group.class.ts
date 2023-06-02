import mongoose from "mongoose";

import User from "./user.class.js";
import Village from "./village.class.js";

/**
 * Describes a group, in a more convenient and lightweight way than the model
 * @Class Group
 */
export default class Group {
    _id: mongoose.Types.ObjectId;
    name: string;
    village: Village | mongoose.Types.ObjectId;
    users: {role: "sensei" | "player", user: User}[];

    /**
     * Creates a new user from a model
     * @param modelGroup The model to create the user from
     */
    static fromModel(modelGroup): Group {

        const user = new Group();
        user._id = modelGroup._id;
        user.name = modelGroup.name;
        user.users = modelGroup.users;

        return user;
    }
}
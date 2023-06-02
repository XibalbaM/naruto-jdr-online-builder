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
     * Creates a new group from a model
     * @param modelGroup The model to create the group from
     */
    static fromModel(modelGroup): Group {

        const group = new Group();
        group._id = modelGroup._id;
        group.name = modelGroup.name;
        group.village = modelGroup.village;
        group.users = modelGroup.users;

        return group;
    }
}
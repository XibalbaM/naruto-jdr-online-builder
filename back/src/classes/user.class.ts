import mongoose from "mongoose";

/**
 * Describes a user, in a more convenient and lightweight way than the model
 * @Class User
 */
export default class User {
    _id: mongoose.Types.ObjectId;
    email: string;
    username?: string;
    isAdmin: boolean;
    groups: [mongoose.Types.ObjectId];
    characters: [mongoose.Types.ObjectId];
    discordId?: string;
    createdAt: Date;
    lastActivity: Date;

    /**
     * Creates a new user from a model
     * @param modelUser The model to create the user from
     */
    static fromModel(modelUser): User {

        const user = new User();
        user._id = modelUser._id;
        user.email = modelUser.email;
        user.username = modelUser.username;
        user.isAdmin = modelUser.isAdmin;
        user.groups = modelUser.groups;
        user.characters = modelUser.characters;
        user.discordId = modelUser.discordId;
        user.createdAt = modelUser.createdAt;
        user.lastActivity = modelUser.lastActivity;

        return user;
    }
}
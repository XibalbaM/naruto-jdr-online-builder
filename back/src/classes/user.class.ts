import {ObjectId} from "mongoose";

/**
 * Describes a user, in a more convenient and lightweight way than the model
 * @Class User
 */
export default class User {
    _id: ObjectId;
    username?: string;
    email: string;
    profileImage?: string;
    isAdmin: boolean;
    groups: {_id: ObjectId, name: String, role: String}[];
    discordId?: string;
    discordUsername?: string;
    discordDiscriminator?: string;

    /**
     * Creates a new user from a model
     * @param modelUser The model to create the user from
     */
    static fromModel(modelUser): User {

        const user = new User();
        user._id = modelUser._id;
        user.username = modelUser.username;
        user.email = modelUser.email;
        user.profileImage = modelUser.profileImage;
        user.isAdmin = modelUser.isAdmin;
        user.groups = modelUser.groups;
        user.discordId = modelUser.discordId;
        user.discordUsername = modelUser.discordUsername;
        user.discordDiscriminator = modelUser.discordDiscriminator;

        return user;
    }
}
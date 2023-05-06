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

        return user;
    }
}
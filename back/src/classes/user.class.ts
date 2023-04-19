import {ObjectId} from "mongoose";

/**
 * Describes a user, in a more convenient and lightweight way than the model
 * @Class User
 */
export default class User {
    id: ObjectId;
    username: string = "Ninja Sans Nom";
    email: string;
    profileImage: string;

    /**
     * Creates a new user from a model
     * @param modelUser The model to create the user from
     */
    static fromModel(modelUser): User {

        const user = new User();
        user.id = modelUser._id;
        user.username = modelUser.username || "Ninja Sans Nom";
        user.email = modelUser.email;
        user.profileImage = modelUser.profileImage;

        return user;
    }
}
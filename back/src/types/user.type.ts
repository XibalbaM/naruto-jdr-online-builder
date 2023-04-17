import {ObjectId} from "mongoose";

export default class User {
    id: ObjectId;
    username: string;
    email: string;
    profileImage: number = 0;

    static fromModel(modelUser): User {

        const user = new User();
        user.id = modelUser._id;
        user.username = modelUser.username;
        user.email = modelUser.email;
        user.profileImage = modelUser.profileImage;

        return user;
    }
}
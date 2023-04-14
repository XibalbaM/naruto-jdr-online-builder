import {ObjectId} from "mongoose";

export default class User {
    id: ObjectId;
    username: string;
    email: string;
    profileImage: number = 0;
    token?: string;
    lastSuccessfulConnection?: Date;

    static fromModel(modelUser): User {

        const user = new User();
        user.id = modelUser._id;
        console.log("Parsing user")
        console.log(modelUser._id)
        console.log(user.id)
        user.username = modelUser.username;
        user.email = modelUser.email;
        user.profileImage = modelUser.profileImage;
        user.token = modelUser.token;
        user.lastSuccessfulConnection = modelUser.lastSuccessfulConnection;

        return user;
    }
}
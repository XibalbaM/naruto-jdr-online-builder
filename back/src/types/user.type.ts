export default class User {
    id?: number;
    username?: string;
    email: string;
    profileImage: number = 0;
    token?: string;
    connectionToken?: string;
    lastConnectionRequest?: Date;
    lastSuccessfulConnection?: Date;

    static fromModel(modelUser): User {

        const user = new User();
        user.id = modelUser._id;
        user.username = modelUser.username;
        user.email = modelUser.email;
        user.profileImage = modelUser.profileImage;
        user.token = modelUser.token;
        user.connectionToken = modelUser.connectionToken;
        user.lastConnectionRequest = modelUser.lastConnectionRequest;
        user.lastSuccessfulConnection = modelUser.lastSuccessfulConnection;

        return user;
    }
}
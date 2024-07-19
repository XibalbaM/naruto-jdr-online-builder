import {ObjectId} from "mongoose";

export default interface User {
    _id: ObjectId;
    email: string;
    username?: string;
    isAdmin: boolean;
    groups: [string];
    characters: [string];
    discordId?: string;
    createdAt: Date;
    lastActivity: Date;
    discordName?: string;
    profileImage?: string;
}
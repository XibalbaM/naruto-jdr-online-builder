import {ObjectId} from "mongoose";
import _User from "naruto-jdr-online-builder-common/src/interfaces/user.interface";

export default interface User extends _User {
    _id: ObjectId;
    characters: string[];
    createdAt: Date;
    lastActivity: Date;
}
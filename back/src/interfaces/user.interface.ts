import {ObjectId} from "mongoose";
import _User from "common/interfaces/user";

export default interface User extends _User {
    _id: ObjectId;
    characters: string[];
}
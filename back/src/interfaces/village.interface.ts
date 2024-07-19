import {ObjectId} from "mongoose";

export default interface Village {
    _id: ObjectId;
    name: string;
}
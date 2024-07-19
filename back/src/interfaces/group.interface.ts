import {ObjectId} from "mongoose";

export default interface Group {
    _id: ObjectId;
    name: string;
    village: string;
    users: {role: "sensei" | "player", user: string}[];
}
import {ObjectId} from "mongoose";

export default interface Rank {
    _id: ObjectId;
    name: string;
    minXp: number;
    maxBase: number;
}
import Line from "./line.interface";
import {ObjectId} from "mongoose";

export default interface Clan {
    _id: ObjectId;
    name: string;
    village: string;
    description: string;
    line: Line;
}
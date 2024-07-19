import Line from "./line.interface";
import {ObjectId} from "mongoose";

export default interface Road {
    _id: ObjectId;
    name: string;
    qualification: string;
    line: Line
}
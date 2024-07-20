import {ObjectId} from "mongoose";
import _Group from "common/interfaces/group";

export default interface Group extends _Group {
    _id: ObjectId;
}
import {ObjectId} from "mongoose";
import _Village from "common/interfaces/village";

export default interface Village extends _Village {
    _id: ObjectId;
}
import {ObjectId} from "mongoose";
import _Village from "naruto-jdr-online-builder-common/src/interfaces/village.interface";

export default interface Village extends _Village {
    _id: ObjectId;
}
import {ObjectId} from "mongoose";
import _Road from "common/interfaces/road";

export default interface Road extends _Road {
    _id: ObjectId;
}
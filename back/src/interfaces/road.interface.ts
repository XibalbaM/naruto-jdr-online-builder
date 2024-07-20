import {ObjectId} from "mongoose";
import _Road from "naruto-jdr-online-builder-common/src/interfaces/road.interface";

export default interface Road extends _Road {
    _id: ObjectId;
}
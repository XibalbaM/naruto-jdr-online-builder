import {ObjectId} from "mongoose";
import _Group from "naruto-jdr-online-builder-common/src/interfaces/group.interface.js";

export default interface Group extends _Group {
    _id: ObjectId;
}
import {ObjectId} from "mongoose";
import _Clan from "common/interfaces/clan";

export default interface Clan extends _Clan {
    _id: ObjectId;
}
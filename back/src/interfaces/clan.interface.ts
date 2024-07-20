import {ObjectId} from "mongoose";
import _Clan from "naruto-jdr-online-builder-common/src/interfaces/clan.interface";

export default interface Clan extends _Clan {
    _id: ObjectId;
}
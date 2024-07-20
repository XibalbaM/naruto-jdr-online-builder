import {ObjectId} from "mongoose";
import _Rank from "common/interfaces/rank";

export default interface Rank extends _Rank {
    _id: ObjectId;
}
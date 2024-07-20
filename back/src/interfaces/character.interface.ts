import {ObjectId} from "mongoose";
import _Character from "common/interfaces/character";

export default interface Character extends _Character {
    _id: ObjectId;
}
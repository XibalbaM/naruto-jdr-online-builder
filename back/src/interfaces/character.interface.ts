import {ObjectId} from "mongoose";
import _Character from "naruto-jdr-online-builder-common/src/interfaces/character.interface";

export default interface Character extends _Character {
    _id: ObjectId;
}
import {ObjectId} from "mongoose";
import {_CustomSkill} from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";

export default interface CustomSkill extends _CustomSkill {
    _id: ObjectId;
}
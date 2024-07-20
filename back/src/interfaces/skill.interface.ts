import {ObjectId} from "mongoose";
import { _CustomSkill } from "common/interfaces/skill";

export default interface CustomSkill extends _CustomSkill {
    _id: ObjectId;
}
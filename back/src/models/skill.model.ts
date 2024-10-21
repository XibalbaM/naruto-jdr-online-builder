import mongoose from "mongoose";
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";
import {removeVersionFromResponse} from "./middlewares.js";

const CommonSkillSchema = new mongoose.Schema<Skill>({
    _id: {
        type: Number,
        required: true,
        unique: true,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    base: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    villages: {
        type: [String],
        required: true,
        default: []
    }
}, {_id: false});
removeVersionFromResponse(CommonSkillSchema);

export const CommonSkillModel = mongoose.model('commonSkill', CommonSkillSchema);

const CustomSkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    base: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["combat", "terrain", "clan"],
        required: true
    },
    villages: {
        type: [String],
        required: true,
        default: []
    }
});
removeVersionFromResponse(CustomSkillSchema);

export const CustomSkillModel = mongoose.model('customSkill', CustomSkillSchema);
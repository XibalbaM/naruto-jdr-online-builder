import mongoose from "mongoose";
import Skill from "naruto-jdr-online-builder-common/src/interfaces/skill.interface";

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
    }
}, {_id: false});

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
    }
});

export const CustomSkillModel = mongoose.model('customSkill', CustomSkillSchema);
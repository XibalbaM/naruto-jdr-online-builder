import mongoose from "mongoose";
import BaseModel from "./base.model.js";
import {CommonSkillModel, CustomSkillModel} from "./skill.model.js";

/**
 * Represents a character in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
export const characterSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	clan: {
		type: mongoose.Types.ObjectId,
		ref: 'clan',
		required: true
	},
	village: {
		type: mongoose.Types.ObjectId,
		ref: 'village',
		required: true
	},
	road: {
		type: mongoose.Types.ObjectId,
		ref: 'road',
		required: false
	},
	xp: {
		type: Number,
		required: true,
		default: 100
	},
    rank: {
        type: mongoose.Types.ObjectId,
        ref: 'rank',
        required: true
    },
	bases: {
		type: [Number],
		required: true
	},
    commonSkills: {
        type: [Number],
        required: true
    },
	customSkills: {
		type: [{
			skill: {
				type: mongoose.Types.ObjectId,
				ref: 'customSkill',
				required: true
			},
			level: {
				type: Number,
				required: true,
				default: 1
			}
		}],
		required: true
	},
	nindo: {
		type: String,
		required: true
	},
	nindoPoints: {
		type: Number,
		required: true,
        default: 1
	},
	chakraSpes: {
        type: [mongoose.Types.ObjectId],
        required: true,
        default: []
	},
	notes: {
		type: String,
		required: false
	},
    isPredrawn: {
        type: Boolean,
        required: true,
        default: false
    }
});

characterSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    this.bases = Array(await BaseModel.count()).fill(1);
    this.commonSkills = Array(await CommonSkillModel.count()).fill(1);
	next();
});

export default mongoose.model('character', characterSchema);
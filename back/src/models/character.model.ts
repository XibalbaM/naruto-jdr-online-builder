import mongoose from "mongoose";
import BaseModel from "./base.model.js";
import ChakraSpeModel from "./chakraSpe.model.js";
import SkillModel from "./skill.model.js";

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
	bases: {
		type: [{
			base: {
				type: mongoose.Types.ObjectId,
				ref: 'base',
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
	skills: {
		type: [{
			skill: {
				type: mongoose.Types.ObjectId,
				ref: 'skill',
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
		default: 0
	},
	chakraSpes: {
		type: [{
			spe: {
				type: mongoose.Types.ObjectId,
				ref: 'chakraSpe',
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
	notes: {
		type: String,
		required: false
	}
});

characterSchema.pre('save', async function (next) {
	if (!this.bases || this.bases.length === 0) {
		// @ts-ignore
		this.bases = (await BaseModel.find()).map(base => base._id).map(id => ({base: id, level: 1}));
	}
	if (!this.skills || this.skills.length === 0) {
		// @ts-ignore
		this.skills = (await SkillModel.find()).map(skill => ({skill: skill._id, level: skill.type === "common" ? 1 : 0}));
	}
	if (!this.chakraSpes || this.chakraSpes.length === 0) {
		// @ts-ignore
		this.chakraSpes = (await ChakraSpeModel.find()).map(spe => spe._id).map(id => ({spe: id, level: 0}));
	}
	next();
});

export default mongoose.model('character', characterSchema);
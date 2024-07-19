import mongoose from "mongoose";
import BaseModel from "./base.model.js";
import {CommonSkillModel} from "./skill.model.js";

/**
 * Represents a character in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const characterSchema = new mongoose.Schema({
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
    shareStatus: {
        type: String,
        required: true,
        default: "private",
        enum: ["private", "not-referenced", "public", "predrawn"]
    }
}, {
    timestamps: true
});

characterSchema.pre('save', async function (next) {
    if (this.isNew) {
        if (this.bases.length === 0)
            this.bases = Array(await BaseModel.countDocuments()).fill(1);
        if (this.commonSkills.length === 0)
            this.commonSkills = Array(await CommonSkillModel.countDocuments()).fill(1);
    }
    next();
});

const CharacterModel = mongoose.model('character', characterSchema);
export default CharacterModel;
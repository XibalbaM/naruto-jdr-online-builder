import mongoose from "mongoose";
import BaseModel from "./base.model.js";
import {CommonSkillModel} from "./skill.model.js";
import Character from "../interfaces/character.interface.js";
import {removeVersionFromResponse} from "./middlewares.js";

/**
 * Represents a character in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const characterSchema = new mongoose.Schema<Character>({
	firstName: {
		type: String,
		required: true
	},
	clan: {
		id: {
			type: String,
			required: true
		},
		clanName: {
			type: String,
			required: false
		}
	},
	village: {
		type: String,
		required: true
	},
	road: {
		type: String,
		required: false
	},
	xp: {
		type: Number,
		required: true,
		default: 100
	},
    rank: {
        type: String,
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
				type: String,
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
        type: [String],
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
removeVersionFromResponse(characterSchema);

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
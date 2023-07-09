import mongoose from "mongoose";
import BaseModel from "./base.model.js";
import ChakraSpeModel from "./chakraSpe.model.js";

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
		type: Map,
		of: Number,
		required: true,
		default: async function () {
			const basesIds = (await BaseModel.find()).map(base => base._id);
			const bases = new Map();
			basesIds.forEach(baseId => {
				bases.set(baseId, 1);
			});
			return bases;
		}
	},
	skills: {
		type: Map,
		of: Number,
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
		type: Map,
		of: Number,
		required: true,
		default: async function () {
			const chakraSpesIds = await ChakraSpeModel.find().select('_id');
			const chakraSpes = new Map();
			chakraSpesIds.forEach(chakraSpe => {
				chakraSpes.set(chakraSpe._id, 0);
			});
			return chakraSpes;
		}
	},
	story: {
		type: String,
		required: true
	}
});

export default mongoose.model('character', characterSchema);
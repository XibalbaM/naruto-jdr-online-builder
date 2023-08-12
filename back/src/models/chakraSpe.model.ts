import mongoose from "mongoose";

/**
 * Represents a chakraSpe in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
export const chakraSpeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	max: {
		type: Number,
		required: true
	},
    effect: {
        type: String,
        required: true
    }
});

export default mongoose.model('chakraSpe', chakraSpeSchema);
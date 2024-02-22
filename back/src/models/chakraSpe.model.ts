import mongoose from "mongoose";

/**
 * Represents a chakraSpe in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const chakraSpeSchema = new mongoose.Schema({
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

const ChakraSpeModel = mongoose.model('chakraSpe', chakraSpeSchema);
export default ChakraSpeModel;
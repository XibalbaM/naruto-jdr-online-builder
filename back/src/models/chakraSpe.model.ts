import mongoose from "mongoose";
import ChakraSpe from "../interfaces/chakraSpe.interface.js";
import {removeVersionFromResponse} from "./middlewares";

/**
 * Represents a chakraSpe in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const chakraSpeSchema = new mongoose.Schema<ChakraSpe>({
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
removeVersionFromResponse(chakraSpeSchema);

const ChakraSpeModel = mongoose.model('chakraSpe', chakraSpeSchema);
export default ChakraSpeModel;
import mongoose from "mongoose";
import Village from "../interfaces/village.interface.js";
import {removeVersionFromResponse} from "./middlewares";

/**
 * Represents a village in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const VillageSchema = new mongoose.Schema<Village>({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
removeVersionFromResponse(VillageSchema);

const VillageModel = mongoose.model("village", VillageSchema);
export default VillageModel;
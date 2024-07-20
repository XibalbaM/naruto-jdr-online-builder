import mongoose from "mongoose";
import Village from "../interfaces/village.interface.js";

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

const VillageModel = mongoose.model("village", VillageSchema);
export default VillageModel;
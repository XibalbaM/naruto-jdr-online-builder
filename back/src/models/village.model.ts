import mongoose from "mongoose";

/**
 * Represents a village in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
export const VillageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('village', VillageSchema);
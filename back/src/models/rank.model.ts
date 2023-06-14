import mongoose from "mongoose";

/**
 * Represents a rank in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
export const rankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('rank', rankSchema);
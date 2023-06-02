import mongoose from "mongoose";

/**
 * Represents a base in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
export const baseSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    shortName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});

export default mongoose.model('base', baseSchema);
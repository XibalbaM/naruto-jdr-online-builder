import mongoose from "mongoose";

/**
 * Represents a skill in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
export const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    base: {
        type: mongoose.Types.ObjectId,
        ref: 'base',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["common", "combat", "terrain", "clan"],
        required: true
    }
});

export default mongoose.model('skill', skillSchema);
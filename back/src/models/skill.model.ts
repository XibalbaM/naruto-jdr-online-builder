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
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCommon: {
        type: Boolean,
        required: true
    },
    isClan: {
        type: Boolean,
        required: true,
        default: false
    }
});

export default mongoose.model('skill', skillSchema);
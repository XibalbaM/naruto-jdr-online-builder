import mongoose from "mongoose";

/**
 * Represents a rank in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const rankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    minXp: {
        type: Number,
        required: true,
        unique: true
    },
    maxBase: {
        type: Number,
        required: true
    }
});

const RankModel = mongoose.model('rank', rankSchema);
export default RankModel;
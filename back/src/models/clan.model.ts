import mongoose from "mongoose";

/**
 * Represents a clan in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const clanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    village: {
        type: mongoose.Types.ObjectId,
        ref: 'village',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    line: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

const ClanModel = mongoose.model('clan', clanSchema);
export default ClanModel;
import mongoose from "mongoose";
import Clan from "../interfaces/clan.interface.js";

/**
 * Represents a clan in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const clanSchema = new mongoose.Schema<Clan>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    village: {
        type: String,
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
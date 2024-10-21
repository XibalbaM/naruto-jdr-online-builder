import mongoose from "mongoose";
import Rank from "../interfaces/rank.interface.js";
import {removeVersionFromResponse} from "./middlewares.js";

/**
 * Represents a rank in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const rankSchema = new mongoose.Schema<Rank>({
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
removeVersionFromResponse(rankSchema);

const RankModel = mongoose.model('rank', rankSchema);
export default RankModel;
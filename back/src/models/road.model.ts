import mongoose from "mongoose";
import Road from "../interfaces/road.interface.js";

/**
 * Represents a road in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const roadSchema = new mongoose.Schema<Road>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    qualification: {
        type: String,
        required: true,
        unique: true
    },
    line: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

const RoadModel = mongoose.model('road', roadSchema);
export default RoadModel;
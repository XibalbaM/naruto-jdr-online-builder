import mongoose from "mongoose";

/**
 * Represents a road in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const roadSchema = new mongoose.Schema({
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
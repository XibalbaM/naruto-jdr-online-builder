import mongoose from "mongoose";

/**
 * Represents a group in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    village: {
        type: mongoose.Types.ObjectId,
        ref: "village",
        required: true
    },
    users: {
        type: [{
            role: {
                type: String,
                enum: ["sensei", "player"],
                required: true,
                default: "player"
            },
            user: {
                type: mongoose.Types.ObjectId,
                ref: "user",
                required: true
            }
        }],
        required: true
    }
});

const GroupModel = mongoose.model("group", GroupSchema);
export default GroupModel;
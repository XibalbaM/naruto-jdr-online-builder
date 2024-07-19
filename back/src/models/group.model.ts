import mongoose from "mongoose";
import Group from "../interfaces/group.interface";

/**
 * Represents a group in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const GroupSchema = new mongoose.Schema<Group>({
    name: {
        type: String,
        required: true
    },
    village: {
        type: String,
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
                type: String,
                required: true
            }
        }],
        required: true
    }
});

const GroupModel = mongoose.model("group", GroupSchema);
export default GroupModel;
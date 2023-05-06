import mongoose, {Types} from "mongoose";

import {UserSchema} from "./user.model.js";

/**
 * Represents a group in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
export const GroupSchema = new mongoose.Schema({
    name: {
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
                type: UserSchema,
                required: true
            }
        }],
        required: true
    }
});

export default mongoose.model('Group', GroupSchema);
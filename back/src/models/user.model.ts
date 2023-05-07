import mongoose, {Types} from "mongoose";

import config from "../config/env.js";

/**
 * Represents a user of the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        minLength: config.user.username.minLength,
        maxLength: config.user.username.maxLength,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    profileImage: {
        type: String,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    groups: {
        type: [{
            _id: {
                type: Types.ObjectId,
                ref: 'Group',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            role: {
                type: String,
                required: true
            }
        }],
        default: [],
        required: true
    }
});

export default mongoose.model('User', UserSchema);
import mongoose from "mongoose";
import User from "../interfaces/user.interface";

/**
 * Represents a user of the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const UserSchema = new mongoose.Schema<User>({
    email: {
        type: String,
        required: true,
        trim: true,
        regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        unique: true,
        index: true
    },
    username: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 20,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    groups: {
        type: [String],
        default: [],
        required: true
    },
    characters: {
        type: [String],
        default: [],
        required: true
    },
    discordId: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActivity: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;
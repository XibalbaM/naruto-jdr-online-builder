import mongoose from "mongoose";

/**
 * Represents a user of the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const UserSchema = new mongoose.Schema({
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
        type: [mongoose.Types.ObjectId],
        ref: 'group',
        default: [],
        required: true
    },
    characters: {
        type: [mongoose.Types.ObjectId],
        ref: 'character',
        default: [],
        required: true
    },
    discordId: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    }
});

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;
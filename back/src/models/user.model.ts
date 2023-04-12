import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    profileImage: {
        type: Number,
        required: true,
        default: 0
    },
    connectionToken: {
        type: String,
        required: false,
        unique: true,
        length: 32
    },
    lastConnectionRequest: {
        type: Date,
        required: false
    },
    lastSuccessfulConnection: {
        type: Date,
        required: false
    }
});

export default mongoose.model('User', UserSchema);
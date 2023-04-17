import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        default: "Ninja Sans Nom",
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
    }
});

export default mongoose.model('User', UserSchema);
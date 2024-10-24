import mongoose from "mongoose";
import Base from "naruto-jdr-online-builder-common/src/interfaces/base.interface";
import {removeVersionFromResponse} from "./middlewares.js";

/**
 * Represents a base in the application.
 * A mongoose model is a wrapper on the MongoDB database.
 */
const baseSchema = new mongoose.Schema<Base>({
    _id: {
        type: Number,
        required: true,
        unique: true,
        auto: true
    },
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    shortName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});
removeVersionFromResponse(baseSchema);

const BaseModel = mongoose.model('base', baseSchema);
export default BaseModel;
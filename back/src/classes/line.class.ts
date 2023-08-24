import mongoose from "mongoose";

/**
 * Describes a line.
 * Used by {@link Road} and {@link Clan}
 * @Class Line
 */
export default class Line {
    skills: mongoose.Types.ObjectId[];
}
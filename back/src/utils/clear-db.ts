import mongoose from "mongoose";

import "../database-connect.js";
import UserSchema from "../models/user.model.js";

export async function initializeDatabase() {
    await mongoose.connection.asPromise();
    await UserSchema.collection.drop();
    console.log("Database cleared");
}
import mongoose from "mongoose";

import "../database-connect.js";
import UserSchema from "../models/user.model.js";

/**
 * Clears the database witch the app currently connected to.
 *
 * Must add the new models to the drop function when they are created.
 */
export async function clearDatabase() {
    await mongoose.connection.asPromise();
    await UserSchema.collection.drop();
    console.log("Database cleared");
}
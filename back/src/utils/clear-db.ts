import mongoose from "mongoose";

import "../database-connect.js";
import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";

/**
 * Clears the database witch the app currently connected to.
 *
 * Must add the new models to the drop function when they are created.
 */
export async function clearDatabase() {
    await mongoose.connection.asPromise();
    await UserModel.collection.drop();
    await GroupModel.collection.drop();
    console.log("Database cleared");
}
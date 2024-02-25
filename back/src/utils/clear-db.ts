import connection from "../database-connect.js";
import mongoose from "mongoose";

/**
 * Clears the database witch the app currently connected to.
 *
 * Must add the new models to the drop function when they are created.
 */
export async function clearDatabase() {
    await connection;
    const strings = (await mongoose.connection.db.listCollections().toArray()).map(collection => collection.name);
    for (let collection of strings) {
        try {
            await mongoose.connection.db.dropCollection(collection);
        } catch (error) {
            console.error("Error dropping collection: ", collection, error);
        }
    }
    console.log("Database cleared");
}
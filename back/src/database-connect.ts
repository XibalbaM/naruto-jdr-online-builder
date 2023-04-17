import mongoose from "mongoose";

import config from "./config/env.js";

/**
 * Connect to MongoDB using the environment configuration.
 * @returns {Promise} A promise that resolves when the connection is established.
 */

console.log(`Connecting to database...`);

mongoose.connect(config.db, {dbName: config.dbName});
mongoose.connection.on("error", (error) => {
    throw new Error(`unable to connect to database: ${error}`);
});
mongoose.connection.on("connected", () => {

    console.log(`Connected to database`);

    if (config.env === "test" || config.env === "development") {
        mongoose.set("debug", true);
    }
});

export default mongoose.connection.asPromise();
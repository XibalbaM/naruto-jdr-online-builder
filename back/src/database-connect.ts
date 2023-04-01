import mongoose from "mongoose";

import config from "./config/env.js";

console.log(`Connecting to database...`);

mongoose.connect(config.db);
mongoose.connection.on("error", (error) => {
    throw new Error(`unable to connect to database: ${error}`);
});
mongoose.connection.on("connected", () => {

    console.log(`Connected to database`);

    if (config.env === "test") {
        mongoose.set("debug", true);
    }
});
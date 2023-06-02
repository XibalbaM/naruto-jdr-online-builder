import addDefaultData from "./src/utils/add-default-data.js";
import mongoose from "mongoose";

await addDefaultData();
await mongoose.connection.close();
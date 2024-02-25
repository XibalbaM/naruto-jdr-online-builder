import addDefaultData from "./src/utils/add-default-data.js";
import mongoose from "mongoose";

// @ts-ignore
await addDefaultData();
// @ts-ignore
await mongoose.connection.close();
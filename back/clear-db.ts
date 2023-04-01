import {initializeDatabase} from './src/utils/clear-db.js';
import mongoose from "mongoose";

await initializeDatabase();
await mongoose.connection.close();
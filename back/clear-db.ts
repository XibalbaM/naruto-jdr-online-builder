import {clearDatabase} from './src/utils/clear-db.js';
import mongoose from "mongoose";

/**
 * Connect to the database, clear it and close the connection.
 *
 * Run from package.json with the command: npm run clear-db
 */

// @ts-ignore
await clearDatabase();
// @ts-ignore
await mongoose.connection.close();
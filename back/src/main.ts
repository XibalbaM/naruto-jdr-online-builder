/**
 * The entry point of the application.
 *
 * Starts the different parts of the application.
 */

import connection from "./database-connect.js";
await connection;
import "./server.js";
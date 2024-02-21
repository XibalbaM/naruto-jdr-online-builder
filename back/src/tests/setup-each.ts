import databaseConnect from "../database-connect.js";

export default async function setupEach() {
    await databaseConnect;
}
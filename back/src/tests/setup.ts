import addDefaultData from "../utils/add-default-data.js";
import {clearDatabase} from "../utils/clear-db.js";
import {init} from "../utils/test.data.js";

export default async function setup() {
    console.log("Setup");
    await clearDatabase();
    await addDefaultData();
    await init();
    console.log("Setup complete");
}
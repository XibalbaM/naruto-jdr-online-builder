import * as fetchUtils from "../utils/tests.utils";
import addDefaultData from "../utils/add-default-data";
import {clearDatabase} from "../utils/clear-db";

export default async function setup() {
    console.log("Setup");
    await clearDatabase();
    await addDefaultData();
    await fetchUtils.init();
    console.log("Setup complete");
}
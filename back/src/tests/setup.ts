import {clearDatabase} from "../utils/clear-db";
import * as fetchUtils from "../utils/tests.utils";

export default async function setup() {
    console.log("Setup");
    await clearDatabase();
    await fetchUtils.createTestAccount();
    console.log("Setup complete");
}
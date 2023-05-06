import * as fetchUtils from "../utils/tests.utils";

export default async function setup() {
    console.log("Setup");
    await fetchUtils.init();
    console.log("Setup complete");
}
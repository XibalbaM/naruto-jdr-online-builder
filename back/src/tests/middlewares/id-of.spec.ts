import {expect, test} from "vitest";

import * as fetchUtils from "../../utils/tests.utils.js";
import VillageModel from "../../models/village.model.js";

/**
 * Test the idOfMiddleware.
 * Use route /villages because it uses this middleware.
 */
test("Calling valid id", async () => {
	const response = await fetchUtils.get("/villages/" + (await VillageModel.findOne())._id, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
});

test("Calling invalid id", async () => {
	const response = await fetchUtils.get("/villages/" + "invalidId", await fetchUtils.getTestToken());

	expect(response.status).toBe(404);
});
import {expect, test} from "vitest";

import * as fetchUtils from "../../utils/tests.utils.js";

/**
 * Test the adminMiddleware.
 * Use route /villages because it uses the adminMiddleware.
 * Every test of admin routes asserts that these tests are passed. The cases were these tests are not passed are tested here and are common to all routes using the adminMiddleware.
 */

test("Calling without being admin", async () => {

    const response = await fetchUtils.post("/villages", {}, await fetchUtils.getTestToken());

    expect(response.status).toBe(401);
});
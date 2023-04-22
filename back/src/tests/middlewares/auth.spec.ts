import {expect, test} from "vitest";

import * as fetchUtils from "../../utils/tests.utils.js";

/**
 * Test the authMiddleware route.
 * Use route /account because it only calls the authMiddleware
 * Every test of authenticated routes asserts that a token is passed. The cases were no token is passed are tested here and are common to all routes using the authMiddleware.
 */

test("Using a valid token", async () => {

    const response = await fetchUtils.get("/account", await fetchUtils.getTestToken());

    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json["user"]["email"]).toBeDefined();
});

test("Using an invalid token", async () => {

    const response = await fetchUtils.get("/account", "invalid");

    expect(response.status).toBe(401);

    const json = await response.json();
    expect(json["error"]).toBe("Cannot authenticate user.");
});

test("Using no token", async () => {

    const response = await fetchUtils.get("/account");

    expect(response.status).toBe(401);

    const json = await response.json();
    expect(json["error"]).toBe("No token provided for accessing a protected resource.");
});
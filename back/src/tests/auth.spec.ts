import {test, expect, beforeAll} from "vitest";
import * as jwt from "jsonwebtoken";

import * as fetchUtils from "../utils/tests.utils.js";
import * as authService from "../services/auth.service.js";
import {initializeDatabase} from "../utils/clear-db.js";
import config from "../config/env.js";

const userEmail = {
    email: "test@test.test",
};

beforeAll(async () => {
    await initializeDatabase();
});

//NORMAL USES
test("POST / with a non-registered email", async () => {

    const response = await fetchUtils.post("/auth", userEmail);

    expect(response.status).toBe(202);
    response.json().then((json) => {
        expect(json["message"]).toBe("Email sent");
        expect(json["isRegistration"]).toBe(true);
    });
});

test("login link received for a new email", async () => {

    const code = await authService.getConnectionTokenFromEmail(userEmail.email);
    const response = await fetchUtils.get("/auth/" + code);

    expect(response.status).toBe(201);

    response.json().then((json) => {
        expect(json["token"]).toBeDefined();
        expect(jwt.verify(json["token"], config.jwt_secret)["id"]).toBeDefined();
    });
});

test("POST / with a registered email", async () => {

    const response = await fetchUtils.post("/auth", userEmail);

    expect(response.status).toBe(202);
    response.json().then((json) => {
        expect(json["message"]).toBe("Email sent");
        expect(json["isRegistration"]).toBe(false);
    });
});

test("login link received for an existing email", async () => {

    const code = await authService.getConnectionTokenFromEmail(userEmail.email);
    const response = await fetchUtils.get("/auth/" + code);

    expect(response.status).toBe(200);

    response.json().then((json) => {
        expect(json["token"]).toBeDefined();
        expect(jwt.verify(json["token"], config.jwt_secret)["id"]).toBeDefined();
    });
});

//BAD USES
test("two requests for the same email in a short time", async () => {

    await fetchUtils.post("/auth", userEmail);
    const response = await fetchUtils.post("/auth", userEmail);

    expect(response.status).toBe(429);

    response.json().then((json) => {
        expect(json["error"]).toBe("Too many requests");
    });
});

test("POST / with an invalid email", async () => {

    const response = await fetchUtils.post("/auth", {email: "invalidEmail"});

    expect(response.status).toBe(400);

    response.json().then((json) => {
        expect(json["error"]).toBe("Invalid email");
    });
});

test("GET /:code with an invalid code", async () => {

    const response = await fetchUtils.get("/auth/invalid");

    expect(response.status).toBe(400);

    response.json().then((json) => {
        expect(json["error"]).toBe("Invalid code");
    });
});
import {test, expect} from "vitest";
import * as jwt from "jsonwebtoken";

import * as fetchUtils from "../../utils/tests.utils.js";
import * as authService from "../../services/auth.service.js";
import config from "../../config/env.js";

const userEmail = {
    email: "test@test.test",
};

//NORMAL USES
test("POST / with a non-registered email", async () => {

    const response = await fetchUtils.post("/auth", userEmail);

    expect(response.status).toBe(202);
    const json = await response.json();
    expect(json["message"]).toBe("Email sent");
    expect(json["isRegistration"]).toBe(true);
});

test("login link received for a new email", async () => {

    const code = authService.getConnectionTokenFromEmail(userEmail.email);
    expect(jwt.verify(code, config.login_jwt_secret)["email"]).toBeDefined();
    const response = await fetchUtils.get("/auth/" + code);

    expect(response.status).toBe(201);

    const json = await response.json();
    expect(json["token"]).toBeDefined();
    expect(jwt.verify(json["token"], config.jwt_secret)["id"]).toBeDefined();

});

test("POST / with a registered email", async () => {

    const response = await fetchUtils.post("/auth", userEmail);

    expect(response.status).toBe(202);
    const json = await response.json();
    expect(json["message"]).toBe("Email sent");
    expect(json["isRegistration"]).toBe(false);
});

test("login link received for an existing email", async () => {

    const code = authService.getConnectionTokenFromEmail(userEmail.email);
    const response = await fetchUtils.get("/auth/" + code);

    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json["token"]).toBeDefined();
    expect(jwt.verify(json["token"], config.jwt_secret)["id"]).toBeDefined();
});

test("POST /refresh", async () => {

    const response = await fetchUtils.get("/auth/refresh", await fetchUtils.getTestToken());

    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json["token"]).toBeDefined();
    expect(jwt.verify(json["token"], config.jwt_secret)["id"]).toBeDefined();
});

//BAD USES
test("two requests for the same email in a short time", async () => {

    await fetchUtils.post("/auth", userEmail);
    const response = await fetchUtils.post("/auth", userEmail);

    expect(response.status).toBe(429);

    const json = await response.json();
    expect(json["error"]).toBe("Too many requests");

    await fetchUtils.get("/auth/" + authService.getConnectionTokenFromEmail(userEmail.email));
});

test("POST / with an invalid email", async () => {

    const response = await fetchUtils.post("/auth", {email: "invalidEmail"});

    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json["error"]).toBe("Invalid email");
});

test("GET /:code with an invalid code", async () => {

    const response = await fetchUtils.get("/auth/invalid");

    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json["error"]).toBe("Invalid code");
});

//LONG TESTS
test("GET /:code with an expired code", async () => {

    const code = authService.getConnectionTokenFromEmail(userEmail.email);
    await new Promise((resolve) => setTimeout(resolve, config.login_jwt_expiration * 1000 + 2000));
    expect(() => {
        jwt.verify(code, config.login_jwt_secret, {ignoreExpiration: false});
    }).toThrow("jwt expired");
    const response = await fetchUtils.get("/auth/" + code);

    expect(response.status).toBe(418);
    const json = await response.json();
    expect(json["error"]).toBe("Code expired");
}, {timeout: 10000});
import {test, expect} from "vitest";

import * as fetchUtils from "../../utils/tests.utils.js";
import config from "../../config/env";

//NORMAL USES
test("POST /username with valid username", async () => {

    const response = await fetchUtils.post("/account/username", {username: "test"}, await fetchUtils.getTestToken());
    expect(response.status).toBe(200);
    const userData = await (await fetchUtils.get("/account", await fetchUtils.getTestToken())).json();
    expect(userData["user"]["username"]).toBe("test");
});

test("POST /email with valid email", async () => {

    const token = await fetchUtils.getTestToken();
    const response = await fetchUtils.post("/account/email", {email: "salut@test.test"}, token);

    expect(response.status).toBe(200);
    const userData = await (await fetchUtils.get("/account", token)).json();
    expect(userData["user"]["email"]).toBe("salut@test.test");

    await fetchUtils.post("/account/email", {email: "testdata@test.test"}, token);
});

test("POST /picture with valid link", async () => {

    const response = await fetchUtils.post("/account/picture", {link: "https://cdn.discordapp.com/attachments/1051546651350810686/1098276195944112228/tametoki_nara.png"}, await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    const userData = await (await fetchUtils.get("/account", await fetchUtils.getTestToken())).json();
    expect(userData["user"]["profileImage"]).toBe("https://cdn.discordapp.com/attachments/1051546651350810686/1098276195944112228/tametoki_nara.png");
});

test("DELETE /picture", async () => {

    const response = await fetchUtils.del("/account/picture", await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    const userData = await (await fetchUtils.get("/account", await fetchUtils.getTestToken())).json();
    expect(userData["user"]["profileImage"]).toBeUndefined();
});

test("DELETE /", async () => {

    const response = await fetchUtils.del("/account", await fetchUtils.getTestToken());

    expect(response.status).toBe(501);
});

//BAD USES
test("POST /username with invalid username", async () => {

    const response = await fetchUtils.post("/account/username", {username: "t"}, await fetchUtils.getTestToken());

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json["error"]).toBe(`Username must be between ${config.user.username.minLength} and ${config.user.username.maxLength} characters.`);
});

test("POST /username with no username", async () => {

    const response = await fetchUtils.post("/account/username", {}, await fetchUtils.getTestToken());

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json["error"]).toBe("Username is required.");
});

test("POST /email with invalid email", async () => {

    const response = await fetchUtils.post("/account/email", {email: "salut"}, await fetchUtils.getTestToken());

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json["error"]).toBe("Email is not valid.");
});

test("POST /email with no email", async () => {

    const response = await fetchUtils.post("/account/email", {}, await fetchUtils.getTestToken());

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json["error"]).toBe("Email is required.");
});

test("POST /picture with invalid link", async () => {

    const response = await fetchUtils.post("/account/picture", {link: "salut"}, await fetchUtils.getTestToken());

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json["error"]).toBe("Link is not valid.");
});

test("POST /picture with no link", async () => {

    const response = await fetchUtils.post("/account/picture", {}, await fetchUtils.getTestToken());

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json["error"]).toBe("Link is required.");
});
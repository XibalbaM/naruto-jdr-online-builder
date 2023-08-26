import {test, expect} from "vitest";

import * as fetchUtils from "../../utils/tests.utils.js";
import {addDiscordAccountToTestAccount, removeDiscordAccountFromTestAccount} from "../../utils/tests.utils.js";

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

test("GET /discord/name", async () => {
    await addDiscordAccountToTestAccount();
    const response = await fetchUtils.get("/account/discord/name", await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json["discordName"]).toBe("Test");
});

test("GET /discord/picture", async () => {

    const response = await fetchUtils.get("/account/discord/picture", await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json["discordPicture"]).toBeDefined();
});

test("DELETE /", async () => {

    const token = await fetchUtils.getTestToken();
    const response = await fetchUtils.del("/account", token);

    expect(response.status).toBe(200);
    const userData = await fetchUtils.get("/account", token);
    expect(userData.status).toBe(401);

    await fetchUtils.createTestAccounts();
});

//BAD USES
test("POST /username with invalid username", async () => {

    const response = await fetchUtils.post("/account/username", {username: "t"}, await fetchUtils.getTestToken());

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json["error"]).toBe(`Username must be between 3 and 20 characters.`);
});

test("POST /email with invalid email", async () => {

    const response = await fetchUtils.post("/account/email", {email: "salut"}, await fetchUtils.getTestToken());

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json["error"]).toBe("Email is not valid.");
});

test("POST /picture with invalid link", async () => {

    const response = await fetchUtils.post("/account/picture", {link: "salut"}, await fetchUtils.getTestToken());

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json["error"]).toBe("Link is not valid.");
});

test("GET /discord/name without discord account", async () => {
    await removeDiscordAccountFromTestAccount();
    const response = await fetchUtils.get("/account/discord/name", await fetchUtils.getTestToken());

    expect(response.status).toBe(404);
});

test("GET /discord/picture without discord account", async () => {

    const response = await fetchUtils.get("/account/discord/picture", await fetchUtils.getTestToken());

    expect(response.status).toBe(404);
});
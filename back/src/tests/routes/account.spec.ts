import {test, expect} from "vitest";

import * as accountController from "../../controllers/account.controller.js";
import {addDiscordAccountToTestAccount, createTestAccounts, getTestToken, removeDiscordAccountFromTestAccount} from "../../utils/test.data";
import {authenticateRequest, createMockRequest, createMockResponse} from "../../utils/tests.utils";
import User from "../../classes/user.class";
import UserModel from "../../models/user.model";
import config from "../../config/config";

test("getUser without discord", async () => {
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.getUser(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({user: expect.any(User)});
    expect(mockResponse.json["mock"]["calls"][0][0]["user"]["profileImage"]).toBeUndefined();
});

test("getUser with discord", async () => {
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await addDiscordAccountToTestAccount();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.getUser(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({user: expect.any(User)});
    expect(mockResponse.json["mock"]["calls"][0][0]["user"]["profileImage"]).toBeDefined();
    await removeDiscordAccountFromTestAccount();
});

test("updateUsername with valid username", async () => {
    let mockRequest = createMockRequest({body: {username: "test"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.updateUsername(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({message: "Username updated."});
    expect((await UserModel.findById(mockRequest["user"]["_id"]))["username"]).toBe("test");
    await UserModel.findByIdAndUpdate(mockRequest["user"]["_id"], {$unset: {username: 1}});
});

test("updateUsername with too long username", async () => {
    let mockRequest = createMockRequest({body: {username: "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.updateUsername(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({error: `Username must be between 3 and 20 characters.`});
    expect(await UserModel.findById(mockRequest["user"]["_id"])["username"]).toBeUndefined();
});

test("updateUsername with too short username", async () => {
    let mockRequest = createMockRequest({body: {username: "te"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.updateUsername(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({error: `Username must be between 3 and 20 characters.`});
    expect(await UserModel.findById(mockRequest["user"]["_id"])["username"]).toBeUndefined();
});

test("updateEmail with valid email", async () => {
    let mockRequest = createMockRequest({body: {email: "test@test.test"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.updateEmail(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({message: "Email updated."});
    expect((await UserModel.findById(mockRequest["user"]["_id"]))["email"]).toBe("test@test.test");
    await UserModel.findByIdAndUpdate(mockRequest["user"]["_id"], {email: mockRequest["user"]["email"]});
});

test("updateEmail with invalid email", async () => {
    let mockRequest = createMockRequest({body: {email: "test"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.updateEmail(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({error: "Email is not valid."});
    expect((await UserModel.findById(mockRequest["user"]["_id"]))["email"]).toBe(mockRequest["user"]["email"]);
});

test("updatePicture with safe link", async () => {
    let mockRequest = createMockRequest({body: {link: "https://cdn.discordapp.com/attachments/316264059571798017/1179840195164651610/image0-3.png"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.updatePicture(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({message: "Link updated."});
    expect((await UserModel.findById(mockRequest["user"]["_id"]))["profileImage"]).toBe("https://cdn.discordapp.com/attachments/316264059571798017/1179840195164651610/image0-3.png");
    await UserModel.findByIdAndUpdate(mockRequest["user"]["_id"], {$unset: {profileImage: 1}});
});

test("updatePicture with bad link", async () => {
    let mockRequest = createMockRequest({body: {link: "https://bad-site.com/image.png"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.updatePicture(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({error: "Link is not valid."});
    expect((await UserModel.findById(mockRequest["user"]["_id"]))["profileImage"]).toBeUndefined();
});

test("deletePicture", async () => {
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await UserModel.findByIdAndUpdate(mockRequest["user"]["_id"], {profileImage: "https://cdn.discordapp.com/attachments/316264059571798017/1179840195164651610/image0-3.png"})
    await accountController.deletePicture(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({message: "Picture removed."});
    expect((await UserModel.findById(mockRequest["user"]["_id"]))["profileImage"]).toBeUndefined();
});

test("deleteAccount", async () => {
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.deleteAccount(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({message: "Account deleted."});
    expect(await UserModel.findById(mockRequest["user"]["_id"])).toBeNull();
    expect(mockResponse.cookie).toBeCalledWith("isLogged", false, {maxAge: config.jwt_expiration_in_ms});
    expect(mockResponse.clearCookie).toBeCalledWith("token", {maxAge: config.jwt_expiration_in_ms, httpOnly: true})
    await createTestAccounts()
});

test("addDiscordAccount", async () => {
    //TODO
});

test("removeDiscordAccount with account", async () => {
    await addDiscordAccountToTestAccount();
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.removeDiscordAccount(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({message: "Discord account removed."});
    expect((await UserModel.findById(mockRequest["user"]["_id"]))["discordId"]).toBeUndefined();
});

test("removeDiscordAccount without account", async () => {
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.removeDiscordAccount(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(409);
    expect(mockResponse.json).toBeCalledWith({error: "User does not have a discord account"});
    expect((await UserModel.findById(mockRequest["user"]["_id"]))["discordId"]).toBeUndefined();
});

test("getDiscordName with account", async () => {
    await addDiscordAccountToTestAccount();
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.getDiscordName(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({discordName: expect.any(String)});
    await removeDiscordAccountFromTestAccount();
});

test("getDiscordName without account", async () => {
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.getDiscordName(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.json).toBeCalledWith({error: "User does not have a discord account"});
});

test("getDiscordPicture with account", async () => {
    await addDiscordAccountToTestAccount();
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.getDiscordPicture(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({discordPicture: expect.any(String)});
    await removeDiscordAccountFromTestAccount();
});

test("getDiscordPicture without account", async () => {
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.getDiscordPicture(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.json).toBeCalledWith({error: "User does not have a discord account"});
});
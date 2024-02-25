import {test, expect} from "vitest";

import * as accountController from "../../controllers/account.controller.js";
import {addDiscordAccountToTestAccount, createTestAccounts, getTestToken, removeDiscordAccountFromTestAccount} from "../../utils/test.data";
import {authenticateRequest, createMockRequest, createMockResponse} from "../../utils/tests.utils";
import User from "../../classes/user.class";
import UserModel from "../../models/user.model";
import config from "../../config/config";

test("getUser", async () => {
    {
        let mockRequest = createMockRequest(undefined, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.getUser(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith({user: expect.any(User)});
        expect(mockResponse.json["mock"]["calls"][0][0]["user"]["profileImage"]).toBeUndefined();
    }

    {
        let mockRequest = createMockRequest(undefined, await getTestToken());
        let mockResponse = createMockResponse();
        await addDiscordAccountToTestAccount();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.getUser(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith({user: expect.any(User)});
        expect(mockResponse.json["mock"]["calls"][0][0]["user"]["profileImage"]).toBeDefined();
        await removeDiscordAccountFromTestAccount();
    }
});

test("updateUsername", async () => {
    {
        let mockRequest = createMockRequest({body: {username: "test"}}, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.updateUsername(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith({message: "Username updated."});
        expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("username"))["username"]).toBe("test");
        await UserModel.findByIdAndUpdate(mockRequest["user"]["_id"], {$unset: {username: 1}});
    }

    {
        let mockRequest = createMockRequest({body: {username: "testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"}}, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.updateUsername(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith({error: `Username must be between 3 and 20 characters.`});
        expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("username"))["username"]).toBeUndefined();
    }

    {
        let mockRequest = createMockRequest({body: {username: "te"}}, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.updateUsername(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith({error: `Username must be between 3 and 20 characters.`});
        expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("username"))["username"]).toBeUndefined();
    }
});

test("updateEmail", async () => {
    {
        let mockRequest = createMockRequest({body: {email: "test@test.test"}}, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.updateEmail(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith({message: "Email updated."});
        expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("email"))["email"]).toBe("test@test.test");
        await UserModel.findByIdAndUpdate(mockRequest["user"]["_id"], {email: mockRequest["user"]["email"]});
    }

    {
        let mockRequest = createMockRequest({body: {email: "test"}}, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.updateEmail(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith({error: "Email is not valid."});
        expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("email"))["email"]).toBe(mockRequest["user"]["email"]);
    }
});

test("updatePicture", async () => {
    {
        let mockRequest = createMockRequest({body: {link: "https://cdn.discordapp.com/attachments/316264059571798017/1179840195164651610/image0-3.png"}}, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.updatePicture(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith({message: "Link updated."});
        expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("profileImage"))["profileImage"]).toBe("https://cdn.discordapp.com/attachments/316264059571798017/1179840195164651610/image0-3.png");
        await UserModel.findByIdAndUpdate(mockRequest["user"]["_id"], {$unset: {profileImage: 1}});
    }

    {
        let mockRequest = createMockRequest({body: {link: "https://bad-site.com/image.png"}}, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.updatePicture(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith({error: "Link is not valid."});
        expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("profileImage"))["profileImage"]).toBeUndefined();
    }
});

test("deletePicture", async () => {
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await UserModel.findByIdAndUpdate(mockRequest["user"]["_id"], {profileImage: "https://cdn.discordapp.com/attachments/316264059571798017/1179840195164651610/image0-3.png"})
    await accountController.deletePicture(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({message: "Picture removed."});
    expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("profileImage"))["profileImage"]).toBeUndefined();
});

test("deleteAccount", async () => {
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await accountController.deleteAccount(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({message: "Account deleted."});
    expect(await UserModel.exists(mockRequest["user"]["_id"])).toBeFalsy();
    expect(mockResponse.cookie).toBeCalledWith("isLogged", false, {maxAge: config.jwt_expiration_in_ms});
    expect(mockResponse.clearCookie).toBeCalledWith("token", {maxAge: config.jwt_expiration_in_ms, httpOnly: true})
    await createTestAccounts()
});

test("addDiscordAccount", async () => {
    //TODO
});

test("removeDiscordAccount", async () => {
    {
        await addDiscordAccountToTestAccount();
        let mockRequest = createMockRequest(undefined, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.removeDiscordAccount(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith({message: "Discord account removed."});
        expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("discordId"))["discordId"]).toBeUndefined();
    }

    {
        let mockRequest = createMockRequest(undefined, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.removeDiscordAccount(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(409);
        expect(mockResponse.json).toBeCalledWith({error: "User does not have a discord account"});
        expect((await UserModel.findById(mockRequest["user"]["_id"]).lean().select("discordId"))["discordId"]).toBeUndefined();
    }
});

test("getDiscordName", async () => {
    {
        await addDiscordAccountToTestAccount();
        let mockRequest = createMockRequest(undefined, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.getDiscordName(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith({discordName: expect.any(String)});
        await removeDiscordAccountFromTestAccount();
    }

    {
        let mockRequest = createMockRequest(undefined, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.getDiscordName(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(404);
        expect(mockResponse.json).toBeCalledWith({error: "User does not have a discord account"});
    }
});

test("getDiscordPicture", async () => {
    {
        await addDiscordAccountToTestAccount();
        let mockRequest = createMockRequest(undefined, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.getDiscordPicture(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith({discordPicture: expect.any(String)});
        await removeDiscordAccountFromTestAccount();
    }

    {
        let mockRequest = createMockRequest(undefined, await getTestToken());
        let mockResponse = createMockResponse();
        await authenticateRequest(mockRequest, mockResponse);
        await accountController.getDiscordPicture(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(404);
        expect(mockResponse.json).toBeCalledWith({error: "User does not have a discord account"});
    }
});
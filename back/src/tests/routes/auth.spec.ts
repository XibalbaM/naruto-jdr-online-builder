import {expect, test} from "vitest";
import {authenticateRequest, createMockRequest, createMockResponse} from "../../utils/tests.utils.js";
import {getTestToken, getTestUserId} from "../../utils/test.data.js";
import * as authController from "../../controllers/auth.controller.js";
import jwt from "jsonwebtoken";
import {generateToken, getConnectionTokenFromEmail} from "../../services/auth.service.js";
import config from "../../config/config.js";

test("requestEmail with valid email", async () => {
    let mockRequest = createMockRequest({body: {email: "test@test.test"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await authController.requestEmail(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(202);
    expect(mockResponse.json).toBeCalledWith({message: "Email sent", isRegistration: true});
})

test("requestEmail with valid email too quickly", async () => {
    let mockRequest = createMockRequest({body: {email: "test@test.test"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await authController.requestEmail(mockRequest, mockResponse);
    await authController.requestEmail(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(429);
    expect(mockResponse.json).toBeCalledWith({error: "Too many requests", isRegistration: true});
})

test("requestEmail with invalid email", async () => {
    let mockRequest = createMockRequest({body: {email: "test"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await authController.requestEmail(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({error: "Invalid email"});
})

test("requestEmail with existing account", async () => {
    let mockRequest = createMockRequest({body: {email: "testdata@test.test"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await authController.requestEmail(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(202);
    expect(mockResponse.json).toBeCalledWith({message: "Email sent", isRegistration: false});
})

test("login with valid code", async () => {
    let mockRequest = createMockRequest({params: {code: getConnectionTokenFromEmail("testdata@test.test")}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await authController.login(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.cookie).toBeCalledWith("token", await generateToken(await getTestUserId()), {maxAge: config.jwt_expiration_in_ms, httpOnly: true});
    expect(mockResponse.cookie).toBeCalledWith("isLogged", true, {maxAge: config.jwt_expiration_in_ms});
})

test("login with valid code for new user", async () => {
    let mockRequest = createMockRequest({params: {code: getConnectionTokenFromEmail("test@test.test")}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await authController.login(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(201);
})

test("login with invalid code", async () => {
    let mockRequest = createMockRequest({params: {code: "test"}}, await getTestToken());
    let mockResponse = createMockResponse();
    await authenticateRequest(mockRequest, mockResponse);
    await authController.login(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.clearCookie).toBeCalledWith("token", {maxAge: config.jwt_expiration_in_ms, httpOnly: true});
    expect(mockResponse.cookie).toBeCalledWith("isLogged", false, {maxAge: config.jwt_expiration_in_ms});
    expect(mockResponse.json).toBeCalledWith({error: "Invalid code"});
})

test("logout", () => {
    let mockResponse = createMockResponse();
    authController.logout(createMockRequest(), mockResponse);

    expect(mockResponse.sendStatus).toBeCalledWith(200);
    expect(mockResponse.clearCookie).toBeCalledWith("token", {maxAge: config.jwt_expiration_in_ms, httpOnly: true});
    expect(mockResponse.cookie).toBeCalledWith("isLogged", false, {maxAge: config.jwt_expiration});
})
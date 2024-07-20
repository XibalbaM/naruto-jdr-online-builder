import {expect, Mock, test} from "vitest";

import authMiddleware from "../../middlewares/security/auth.middleware.js";
import {createMockNext, createMockRequest, createMockResponse, sleep} from "../../utils/tests.utils.js";
import {getTestToken} from "../../utils/test.data.js";

/**
 * Test the authMiddleware route.
 * Use route /account because it only calls the authMiddleware
 * Every test of authenticated routes asserts that a token is passed. The cases were no token is passed are tested here and are common to all routes using the authMiddleware.
 */

test("Using a valid token", async () => {

    let authMiddlewareFun = authMiddleware();
    let mockRequest = createMockRequest(undefined, await getTestToken());
    let mockNext = createMockNext();
    await authMiddlewareFun(mockRequest, createMockResponse(), mockNext);

    expect(mockNext).toBeCalled();
    expect(mockRequest["user"]).toBeDefined();
});

test("Using an invalid token", async () => {

    let authMiddlewareFun = authMiddleware();
    let mockResponse = createMockResponse();
    let mockNext = createMockNext();
    await authMiddlewareFun(createMockRequest(undefined, "invalid"), mockResponse, mockNext);

    expect(mockNext).toBeCalledTimes(0);
    expect(mockResponse.send).toBeCalledWith({error: "Cannot authenticate user."});
});

test("Using no token", async () => {

    let authMiddlewareFun = authMiddleware();
    let mockResponse = createMockResponse();
    let mockNext = createMockNext();
    await authMiddlewareFun(createMockRequest(), mockResponse, mockNext);

    expect(mockNext).toBeCalledTimes(0);
    expect(mockResponse.send).toBeCalledWith({error: "No token provided for accessing a protected resource."});
});
import {expect, test} from "vitest";

import adminMiddleware from "../../middlewares/security/admin.middleware.js";
import {createMockNext, createMockRequest, createMockResponse} from "../../utils/tests.utils.js";

/**
 * Test the adminMiddleware.
 * Use route /villages because it uses the adminMiddleware.
 * Every test of admin routes asserts that these tests are passed. The cases were these tests are not passed are tested here and are common to all routes using the adminMiddleware.
 */

test("Calling with admin privilege", async () => {
    let adminMiddlewareFun = adminMiddleware()
    let mockNext = createMockNext();
    await adminMiddlewareFun(createMockRequest({user: {isAdmin: true}}), createMockResponse(), mockNext);
    expect(mockNext).toBeCalled();
});

test("Calling without admin privilege", async () => {
    let adminMiddlewareFun = adminMiddleware()
    let mockNext = createMockNext();
    let mockResponse = createMockResponse();
    await adminMiddlewareFun(createMockRequest({user: {isAdmin: false}}), mockResponse, mockNext);
    expect(mockNext).toBeCalledTimes(0);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({message: "You must be an admin to do this."});
});

test("Calling without user", async () => {
    let adminMiddlewareFun = adminMiddleware()
    await expect(() => adminMiddlewareFun(createMockRequest(), createMockResponse(), createMockNext())).rejects.toThrowError("authMiddleware");
});
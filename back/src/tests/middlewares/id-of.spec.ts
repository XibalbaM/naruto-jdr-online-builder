import {expect, Mock, test} from "vitest";
import idOfMiddleware from "../../middlewares/id-of.middleware";
import {createMockNext, createMockRequest, createMockResponse, sleep} from "../../utils/tests.utils.js";
import BaseModel from "../../models/base.model";

/**
 * Test the idOfMiddleware.
 * Use route /villages because it uses this middleware.
 */
test("Calling valid id in url params", async () => {

    let idOfMiddlewareFun = idOfMiddleware(BaseModel, "test");
    let mockNext = createMockNext();
    let mockResponse = createMockResponse();
    await idOfMiddlewareFun(createMockRequest({params: {test: 0}}), mockResponse, mockNext);

	expect(mockNext).toBeCalled();
});

test("Calling invalid id in url params", async () => {

    let idOfMiddlewareFun = idOfMiddleware(BaseModel, "test");
    let mockNext = createMockNext();
    let mockResponse = createMockResponse();
    await idOfMiddlewareFun(createMockRequest({params: {test: "invalid"}}), mockResponse, mockNext);

    expect(mockNext).toBeCalledTimes(0);
    expect(mockResponse.json).toBeCalledWith({error: "base not found"});
});

test("Calling valid id in body", async () => {

    let idOfMiddlewareFun = idOfMiddleware(BaseModel, "test", true);
    let mockNext = createMockNext();
    let mockResponse = createMockResponse();
    await idOfMiddlewareFun(createMockRequest({body: {test: 0}}), mockResponse, mockNext);

    expect(mockNext).toBeCalled();
});

test("Calling invalid id in body", async () => {

    let idOfMiddlewareFun = idOfMiddleware(BaseModel, "test", true);
    let mockNext = createMockNext();
    let mockResponse = createMockResponse();
    await idOfMiddlewareFun(createMockRequest({body: {test: "invalid"}}), mockResponse, mockNext);

    expect(mockNext).toBeCalledTimes(0);
    expect(mockResponse.json).toBeCalledWith({error: "base not found"});
});
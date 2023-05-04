import {expect, test} from "vitest";
import {checkTypeFields} from "../../middlewares/content.middleware.js";

/**
 * Test the contentMiddleware, by directly calling his internal function.
 * Every test of routes requiring content asserts that a content is passed. The cases were no content is passed are tested here and are common to all routes using the contentMiddleware.
 */

class TestClass {
    test: string;
    test2: number;
    test3: boolean;
    test4: Date;

    constructor() {
        this.test = "test";
        this.test2 = 2;
        this.test3 = true;
        this.test4 = new Date();
    }
}

test("Passing valid content", async () => {

    expect(checkTypeFields({email: 'string', number: 0, object: new TestClass()}, {email: "test", number: 2, object: new TestClass()})).toBe(true);
});

test("Passing partial content", async () => {

    expect(checkTypeFields({email: 'string', number: 0, object: new TestClass()}, {email: "test", number: 2})).toBe(false);
});

test("Passing no content", async () => {

    expect(checkTypeFields({email: 'string', number: 0, object: new TestClass()}, undefined)).toBe(false);
    expect(checkTypeFields({email: 'string', number: 0, object: new TestClass()}, null)).toBe(false);
    expect(checkTypeFields({email: 'string', number: 0, object: new TestClass()}, {})).toBe(false);
});

test("Passing full content with types mismatch", async () => {

    expect(checkTypeFields({email: 'string', number: 0, object: new TestClass()}, {email: 12, number: 2, object: new TestClass()})).toBe(false);
    expect(checkTypeFields({email: 'string', number: 0, object: new TestClass()}, {email: "test", number: "2", object: new TestClass()})).toBe(false);
    expect(checkTypeFields({email: 'string', number: 0, object: new TestClass()}, {email: "test", number: 2, object: {test: true}})).toBe(false);
});
import config from "../config/env";
import userModel from "../models/user.model";
import databaseConnect from "../database-connect";

import fetch, {Response} from "node-fetch";
import jwt from "jsonwebtoken";
import groupModel from "../models/group.model";
import UserModel from "../models/user.model";
import VillageModel from "../models/village.model";

/**
 * Processes the given url to make sure it is a full url and to provide a shorthand for api calls.
 * @param url the url to process.
 * @returns the processed url.
 */
function processUrl(url: string) {
    if (url.startsWith('/')) {
        return `${config.protocol}://${config.host}:${config.port}/api${url}`;
    }
    return url;
}

/**
 * Initializes the test environment.
 */
export async function init() {
    await createTestAccounts();
    await createTestGroup();
}

let testToken: string;
let adminToken: string;

/**
 * Create accounts used for authenticated tests.
 */
export async function createTestAccounts() {
    await databaseConnect;
    await userModel.create({email: 'testdata@test.test'});
    await userModel.create({email: 'admin@test.test', isAdmin: true});
    testToken = null;
    adminToken = null;
    console.log("Test account created");
}

/**
 * @returns the test token.
 */
export async function getTestToken(): Promise<string> {
    await databaseConnect;
    if (!testToken) {
        testToken = jwt.sign({id: (await userModel.findOne({email: 'testdata@test.test'}))._id}, config.jwt_secret, {expiresIn: config.jwt_expiration});
    }
    return testToken;
}

/**
 * @returns the admin token.
 */
export async function getAdminToken(): Promise<string> {
    await databaseConnect;
    if (!adminToken) {
        adminToken = jwt.sign({id: (await userModel.findOne({email: 'admin@test.test'}))._id}, config.jwt_secret, {expiresIn: config.jwt_expiration});
    }
    return adminToken;
}

/**
 * Create group used for tests.
 */
export async function createTestGroup() {
    await databaseConnect;
    const user = await userModel.findOne({email: 'testdata@test.test'});
    const group = await groupModel.create({name: 'testDataGroup', village: await VillageModel.findOne({name: "Konoha"}), users: [{role: "sensei", user: user}]});
    await UserModel.findByIdAndUpdate(user._id, {$push: {groups: {name: group.name, role: "sensei", _id: group.id}}});
    console.log("Test group created");
}

/**
 * @returns the test group's id.
 */
export async function getTestGroupId(): Promise<string> {
    await databaseConnect;
    return (await groupModel.findOne({name: 'testDataGroup'}))._id.toString();
}

/**
 * Returns the response of a GET request to the given url.
 * @param url the url to send the request to.
 * @param token the token to use for authentication.
 * @returns a promise that resolves to the response.
 */
export function get(url: string, token?: string): Promise<Response> {
    return fetch(processUrl(url), {
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    });
}

/**
 * Returns the response of a POST request to the given url.
 * @param url the url to send the request to.
 * @param body the body of the request.
 * @param token the token to use for authentication.
 * @returns a promise that resolves to the response.
 */
export function post(url: string, body: any, token?: string): Promise<Response> {
    return fetch(processUrl(url), {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    });
}

/**
 * Returns the response of a PUT request to the given url.
 * @param url the url to send the request to.
 * @param body the body of the request.
 * @param token the token to use for authentication.
 * @returns a promise that resolves to the response.
 */
export function put(url: string, body: any, token?: string): Promise<Response> {
    return fetch(processUrl(url), {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    });
}

/**
 * Returns the response of a DELETE request to the given url.
 * @param url the url to send the request to.
 * @param token the token to use for authentication.
 * @returns a promise that resolves to the response.
 */
export function del(url: string, token?: string): Promise<Response> {
    return fetch(processUrl(url), {
        method: 'DELETE',
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    });
}
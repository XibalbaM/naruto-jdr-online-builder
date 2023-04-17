import config from "../config/env";

import fetch, {Response} from "node-fetch";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";

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
 * Returns a valid token for testing.
 * @returns a promise that resolves to the token.
 */
export async function testToken(): Promise<string> {
    let user = await userModel.findOne({email: 'test@test.test'});
    if (!user) {
        user = await userModel.create({email: 'test@test.test'});
    }
    return jwt.sign({id: user._id}, config.jwt_secret, {expiresIn: config.jwt_expiration});
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
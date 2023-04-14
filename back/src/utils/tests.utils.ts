import config from "../config/env";

import fetch, {Response} from "node-fetch";

function processUrl(url: string) {
    if (url.startsWith('/')) {
        return `${config.protocol}://${config.host}:${config.port}/api${url}`;
    }
    return url;
}

/**
 * returns the response of a GET request to the given url.
 * @param url the url to send the request to.
 * @param token the token to use for authentication.
 * @returns a promise that resolves to the response.
 */
export function get(url: string, token?: string): Promise<Response> {
    return fetch(processUrl(url), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

/**
 * returns the response of a POST request to the given url.
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
            'Authorization': `Bearer ${token}`
        }
    });
}

/**
 * returns the response of a PUT request to the given url.
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
            'Authorization': `Bearer ${token}`
        }
    });
}

/**
 * returns the response of a DELETE request to the given url.
 * @param url the url to send the request to.
 * @param token the token to use for authentication.
 * @returns a promise that resolves to the response.
 */
export function del(url: string, token?: string): Promise<Response> {
    return fetch(processUrl(url), {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
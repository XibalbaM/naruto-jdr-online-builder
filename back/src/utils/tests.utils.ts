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
 * @returns a promise that resolves to the response.
 */
export function get(url: string): Promise<Response> {
    return fetch(processUrl(url));
}

/**
 * returns the response of a POST request to the given url.
 * @param url the url to send the request to.
 * @param body the body of the request.
 * @returns a promise that resolves to the response.
 */
export function post(url: string, body: any): Promise<Response> {
    return fetch(processUrl(url), {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * returns the response of a PUT request to the given url.
 * @param url the url to send the request to.
 * @param body the body of the request.
 * @returns a promise that resolves to the response.
 */
export function put(url: string, body: any): Promise<Response> {
    return fetch(processUrl(url), {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * returns the response of a DELETE request to the given url.
 * @param url the url to send the request to.
 * @returns a promise that resolves to the response.
 */
export function del(url: string): Promise<Response> {
    return fetch(processUrl(url), {
        method: 'DELETE'
    });
}
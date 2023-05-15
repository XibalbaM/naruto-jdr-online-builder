import jwt from "jsonwebtoken";

import config from "../config/env.js";
import axios, {AxiosResponse} from "axios";

/**
 * Processes the given url to make sure it is a full url and to provide a shorthand for api calls.
 * @param url the url to process.
 * @returns the processed url.
 */
function processUrl(url: string) {
    if (url.startsWith("/")) {
        return config.api_url + url;
    }
    return url;
}

export function tokenFromId(id: string | undefined) {
    return id ? jwt.sign({discordId: id}, config.jwt_secret, {expiresIn: config.jwt_expiration}) : undefined;
}

/**
 * Returns the response of a GET request to the given url.
 * @param url the url to send the request to.
 * @param id the id of the user making the request.
 * @returns a promise that resolves to the response.
 */
export function get<T>(url: string, id?: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(processUrl(url), {
        headers: {
            "Authorization": tokenFromId(id) ? `Bearer ${tokenFromId(id)}` : "",
        },
    });
}

/**
 * Returns the response of a POST request to the given url.
 * @param url the url to send the request to.
 * @param body the body of the request.
 * @param id the id of the user making the request.
 * @returns a promise that resolves to the response.
 */
export function post<T>(url: string, body: any, id?: string): Promise<AxiosResponse<T>> {
    return axios.post<T>(processUrl(url), body, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": tokenFromId(id) ? `Bearer ${tokenFromId(id)}` : "",
        },
    });
}

/**
 * Returns the response of a PUT request to the given url.
 * @param url the url to send the request to.
 * @param body the body of the request.
 * @param id the id of the user making the request.
 * @returns a promise that resolves to the response.
 */
export function put<T>(url: string, body: any, id?: string): Promise<AxiosResponse<T>> {
    return axios.put<T>(processUrl(url), body, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": tokenFromId(id) ? `Bearer ${tokenFromId(id)}` : "",
        },
    });
}

/**
 * Returns the response of a DELETE request to the given url.
 * @param url the url to send the request to.
 * @param id the id of the user making the request.
 * @returns a promise that resolves to the response.
 */
export function del<T>(url: string, id?: string): Promise<AxiosResponse<T>> {
    return axios.delete<T>(processUrl(url), {
        headers: {
            "Authorization": tokenFromId(id) ? `Bearer ${tokenFromId(id)}` : "",
        },
    });
}
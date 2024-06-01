import jwt from "jsonwebtoken";

import config from "../config/env.js";
import axios, {AxiosResponse} from "axios";

/**
 * A class containing utility methods for api calls.
 */
export default class ApiUtils {
    /**
     * Processes the given url to make sure it is a full url and to provide a shorthand for api calls.
     * @param url the url to process.
     * @returns the processed url.
     */
    static processUrl(url: string) {
        if (url.startsWith("/")) {
            return config.api_url + "/discord" + url;
        }
        return url;
    }

    static tokenFromId(id: string | undefined) {
        return id ? jwt.sign({discordId: id}, config.jwt_secret, {expiresIn: config.jwt_expiration}) : undefined;
    }

    /**
     * Returns the response of a GET request to the given url.
     * @param url the url to send the request to.
     * @param id the id of the user making the request.
     * @returns a promise that resolves to the response.
     */
    static get<T>(url: string, id?: string): Promise<AxiosResponse<T>> {
        return axios.get<T>(this.processUrl(url), {
            validateStatus: (status) => true,
            headers: {
                "Authorization": this.tokenFromId(id) ? `Bearer ${this.tokenFromId(id)}` : "",
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
    static post<T>(url: string, body: any, id?: string): Promise<AxiosResponse<T>> {
        return axios.post<T>(this.processUrl(url), body, {
            validateStatus: (status) => true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.tokenFromId(id) ? `Bearer ${this.tokenFromId(id)}` : "",
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
    static put<T>(url: string, body: any, id?: string): Promise<AxiosResponse<T>> {
        return axios.put<T>(this.processUrl(url), body, {
            validateStatus: (status) => true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.tokenFromId(id) ? `Bearer ${this.tokenFromId(id)}` : "",
            },
        });
    }

    /**
     * Returns the response of a DELETE request to the given url.
     * @param url the url to send the request to.
     * @param id the id of the user making the request.
     * @returns a promise that resolves to the response.
     */
    static del<T>(url: string, id?: string): Promise<AxiosResponse<T>> {
        return axios.delete<T>(this.processUrl(url), {
            validateStatus: (status) => true,
            headers: {
                "Authorization": this.tokenFromId(id) ? `Bearer ${this.tokenFromId(id)}` : "",
            },
        });
    }
}
import jwt from "jsonwebtoken";

import {Middleware} from "./middleware.type.js";
import config from "../config/config.js";

/**
 * Return a middleware that log every request.
 * @param basePath The path where the middleware is used.
 */
export default function (basePath: string): Middleware {
    return (req, res, next) => {
        let id = "non-authenticated";
        let type: 'discord' | 'website' | undefined = undefined;
        if (req.headers.authorization) {
            try {
                const tokenData = jwt.verify(req.headers.authorization.split(" ")[1], config.jwt_secret);
                type = "discord";
                id = tokenData["discordId"];
            } catch (e) {
                id = "invalid token";
            }
        } else if (req.cookies["token"]) {
            try {
                const tokenData = jwt.verify(req.cookies["token"], config.jwt_secret);
                type = "website";
                id = tokenData["id"];
            } catch (e) {
                id = "invalid token";
            }
        }
        console.log(`${new Date().toISOString()}: ${req.method} ${basePath + req.path} from ${req.ip} with ${JSON.stringify(req.body)} as ${id} ${type ? `(${type})` : ""}`);
        next();
    }
}
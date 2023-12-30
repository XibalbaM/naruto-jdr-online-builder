import fetch from "node-fetch";

import {Middleware} from "../middleware.type.js";
import config from "../../config/config.js";

/**
 * A function that returns a {@link Middleware} that checks if a valid captcha token is provided.
 * @returns {Middleware} The middleware
 */
export default function (): Middleware {
    return async function (req, res, next) {
        if (config.env === "test")
            return next();
        const token = req.body.captcha;
        if (token) {
            if (await testToken(token)) {
                next();
            } else {
                res.status(401).send({error: 'Invalid captcha token provided for accessing a protected resource.'});
            }
        } else {
            res.status(401).send({error: 'No captcha token provided for accessing a protected resource.'});
        }
    }
}

export async function testToken(token: string): Promise<boolean> {
    try {
        const response= await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${config.reCaptchaSecretKey}&response=${token}`);
        return !!((await response.json())["success"]);
    } catch (e) {
        return false;
    }
}
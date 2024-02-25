import {Request, Response} from "express";
import * as authService from "../services/auth.service.js";
import config from "../config/config.js";

/**
 * Handles requests to /auth
 *
 * It takes the email address from the body and passes it to {@link authService#requestEmail}, then returns the good status code and data
 * @param req The request
 * @param res The response
 */
export async function requestEmail(req: Request, res: Response) {

    if (req.body.email && req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        try {
            let result = await authService.requestEmail(req.body.email);
            switch (result.code) {
                case 0:
                    res.status(202).json({message: "Email sent", isRegistration: result.isRegistration});
                    break;

                case 1:
                    res.status(429).json({error: "Too many requests", isRegistration: result.isRegistration});
                    break;

                default:
                    res.status(500).json({error: "Internal server error"});
            }
        } catch (err) {
            res.status(500).json({error: "Internal server error"});
            console.error(err);
        }
    } else {

        res.status(400).json({error: "Invalid email"});
    }
}

/**
 * Handles requests to /auth/:code
 *
 * It takes the code from the url and passes it to {@link authService#useCode}, then returns the good status code and data
 * @param req The request
 * @param res The response
 */
export async function login(req: Request, res: Response) {

    const code = req.params.code;

    try {
        let data = await authService.useCode(code)
        res.status(data.isFirstLogin ? 201 : 200).cookie("token", data.token, {
            maxAge: config.jwt_expiration_in_ms,
            httpOnly: true
        }).cookie("isLogged", true, {maxAge: config.jwt_expiration_in_ms})
            .json({discordUsername: data.discordUsername});
    } catch (err) {
        if (err.message === "Invalid code") {
            res.status(400).clearCookie("token", {
                maxAge: config.jwt_expiration_in_ms,
                httpOnly: true
            }).cookie("isLogged", false, {maxAge: config.jwt_expiration_in_ms})
                .json({error: "Invalid code"});
        } else if (err.message === "jwt expired") {
            res.status(418).clearCookie("token", {
                maxAge: config.jwt_expiration_in_ms,
                httpOnly: true
            }).cookie("isLogged", false, {maxAge: config.jwt_expiration_in_ms})
                .json({error: "Code expired"});
        } else {
            res.status(500).clearCookie("token", {
                maxAge: config.jwt_expiration_in_ms,
                httpOnly: true
            }).cookie("isLogged", false, {maxAge: config.jwt_expiration_in_ms})
                .json({error: "Internal server error"});
            console.error(err);
        }
    }
}

/**
 * Handles requests to /auth/logout
 *
 * Used to unset the token cookies
 */
export function logout(req: Request, res: Response) {
    res.clearCookie("token", {maxAge: config.jwt_expiration_in_ms, httpOnly: true}).cookie("isLogged", false, {maxAge: config.jwt_expiration}).sendStatus(200);
}
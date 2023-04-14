import e, {Request, Response} from "express";
import * as authService from "../services/auth.service.js";

export function requireEmail(req: Request, res: Response) {

    if (req.body.email && req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {

        authService.requestEmail(req.body.email).then((result) => {
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
        }).catch((err) => {
            res.status(500).json({error: "Internal server error"});
            console.error(err);
        });
    } else {

        res.status(400).json({error: "Invalid email"});
    }
}

export function refreshToken(req: Request, res: Response) {

    authService.generateToken(req["user"]["id"]).then(token => {
        res.status(200).json({token: token});
    }).catch(err => {
        res.status(500).json({error: "Internal server error"});
        console.error(err);
    });
}

export function login(req: Request, res: Response) {

    const code = req.params.code;

    authService.useCode(code).then((data) => {
        if (data.isFirstLogin) {
            res.status(201).json({token: data.token});
        } else {
            res.status(200).json({token: data.token});
        }
    }).catch((err) => {
        if (err.message === "Invalid code") {
            res.status(400).json({error: "Invalid code"});
        } else if (err.message === "jwt expired") {
            res.status(418).json({error: "Code expired"});
        } else {
            res.status(500).json({error: "Internal server error"});
            console.error(err);
        }
    });
}
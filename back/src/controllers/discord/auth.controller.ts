import {Request, Response} from "express";
import * as authService from "../../services/auth.service.js";

export function requestDiscordAccountConnection(req: Request, res: Response) {

    if (req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {

        authService.requestEmail(req.body.email, req.body.discordId).then((result) => {
            switch (result.code) {
                case 0:
                    res.status(202).json({message: "Email sent", isRegistration: result.isRegistration});
                    break;
                case 1:
                    res.status(429).json({error: "Too many requests", isRegistration: result.isRegistration});
                    break;
                case 2:
                    res.status(409).json({error: "User already has a discord account"});
                    break;
                case 3:
                    res.status(409).json({error: "This discord account is already linked to another user"});
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
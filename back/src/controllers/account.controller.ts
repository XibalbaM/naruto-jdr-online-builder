import {Request, Response} from "express";

import * as accountService from "../services/account.service.js";
import config from "../config/config.js";

/**
 * Handles GET requests to /account/user
 *
 * Must be preceded by the authMiddleware
 *
 * Simply returns the user received from the authMiddleware
 * @param req The request
 * @param res The response
 */
export async function getUser(req: Request, res: Response) {
    try {
        if (req.user!.discordId) {
            req.user!.discordName = await accountService.getDiscordName(req.user!.discordId)
            if (!req.user!.profileImage)
                req.user!.profileImage = await accountService.getDiscordPicture(req.user!.discordId)
        }
    } catch (ignored) {
    }
    res.status(200).json({user: req.user});
}

/**
 * Handles POST requests to /account/username
 *
 * Must be preceded by the authMiddleware
 *
 * Updates the username of the user
 * @param req The request
 * @param res The response
 */
export async function updateUsername(req: Request, res: Response) {

    const username = req.body.username;
    if (username.length >= 3 && username.length <= 20) {
        try {
            await accountService.updateUsername(req.user!._id.toString(), username);
            res.status(200).json({message: "Username updated."});
        } catch (err: any) {
            console.error(err);
            res.status(500).json({error: err.message});
        }
    } else {
        res.status(400).json({error: `Username must be between 3 and 20 characters.`});
    }
}

/**
 * Handles POST requests to /account/email
 *
 * Must be preceded by the authMiddleware
 *
 * Updates the email of the user
 * @param req The request
 * @param res The response
 */
export async function updateEmail(req: Request, res: Response) {

    const email = req.body.email;
    if (email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        try {
            await accountService.updateEmail(req.user!._id.toString(), email);
            res.status(200).json({message: "Email updated."});
        } catch (err: any) {
            console.error(err);
            res.status(500).json({error: err.message});
        }
    } else {
        res.status(400).json({error: "Email is not valid."});
    }
}

/**
 * Handles DELETE requests to /account
 *
 * Must be preceded by the authMiddleware
 *
 * Deletes the account of the user
 * @param req The request
 * @param res The response
 */
export async function deleteAccount(req: Request, res: Response) {
    try {
        await accountService.deleteAccount(req.user!._id.toString())
        res.status(200).clearCookie("token", {
            maxAge: config.jwt_expiration_in_ms,
            httpOnly: true
        }).cookie("isLogged", false, {maxAge: config.jwt_expiration_in_ms})
            .json({message: "Account deleted."});
    } catch (err: any) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
}

/**
 * Handles POST requests to /account/discord
 *
 * Must be preceded by the authMiddleware
 *
 * Links a discord account to the user
 * @param req The request
 * @param res The response
 */
export async function addDiscordAccount(req: Request, res: Response) {

    try {
        res.status(200).json({username: await accountService.addDiscordAccount(req.user!, req.body.code)});
    } catch (err: any) {
        switch (err.message) {
            case "Invalid code":
            case "Invalid \"code\" in request.":
                res.status(400).json({error: "Invalid code"});
                break;
            case "User already has a discord account":
                res.status(409).json({error: "User already has a discord account"});
                break;
            case "Discord account already linked to another user":
                res.status(409).json({error: "Discord account already linked to another user"});
                break;
            default:
                res.status(500).json({error: "Internal server error"});
                console.error(err);
        }
    }
}

/**
 * Handles DELETE requests to /account/discord
 *
 * Must be preceded by the authMiddleware
 *
 * Unlinks the discord account from the user
 * @param req The request
 * @param res The response
 */
export async function removeDiscordAccount(req: Request, res: Response) {

    try {
        await accountService.removeDiscordAccount(req.user!);
        res.status(200).json({message: "Discord account removed."});
    } catch (err: any) {
        if (err.message === "User does not have a discord account")
            res.status(409).json({error: "User does not have a discord account"});
        else
            console.error(err);
            res.status(500).json({error: "Internal server error"});
    }
}

/**
 * Handles DELETE requests to /account/discord
 *
 * Must be preceded by the authMiddleware
 *
 * Unlinks the discord account from the user
 * @param req The request
 * @param res The response
 */
export async function getDiscordName(req: Request, res: Response) {

    try {
        if (req.user!.discordId) res.status(200).json({discordName: await accountService.getDiscordName(req.user!["discordId"])});
        else res.status(404).json({error: "User does not have a discord account"});
    } catch (err: any) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
}

/**
 * Handles DELETE requests to /account/discord
 *
 * Must be preceded by the authMiddleware
 *
 * Unlinks the discord account from the user
 * @param req The request
 * @param res The response
 */
export async function getDiscordPicture(req: Request, res: Response) {

    try {
        if (req.user!.discordId) res.status(200).json({discordPicture: await accountService.getDiscordPicture(req.user!.discordId)});
        else res.status(404).json({error: "User does not have a discord account"});
    } catch (err: any) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
}
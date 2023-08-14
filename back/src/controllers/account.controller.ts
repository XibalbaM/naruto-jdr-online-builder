import {Request, Response} from "express";

import * as accountService from "../services/account.service.js";
import * as imagesService from "../services/images.service.js";
import config from "../config/env.js";

/**
 * Handles GET requests to /account/user
 *
 * Must be preceded by the authMiddleware
 *
 * Simply returns the user received from the authMiddleware
 * @param req The request
 * @param res The response
 */
export function getUser(req: Request, res: Response) {

    res.status(200).json({user: req["user"]});
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
export function updateUsername(req: Request, res: Response) {

    const username = req.body.username;
    if (username.length >= config.user.username.minLength && username.length <= config.user.username.maxLength) {
        accountService.updateUsername(req["user"]["_id"], username).then(() => {
            res.status(200).json({message: "Username updated."});
        }).catch((err) => {
            res.status(500).json({error: err.message});
        });
    } else {
        res.status(400).json({error: `Username must be between ${config.user.username.minLength} and ${config.user.username.maxLength} characters.`});
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
export function updateEmail(req: Request, res: Response) {

    const email = req.body.email;
    if (email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        accountService.updateEmail(req["user"]["_id"], email).then(() => {
            res.status(200).json({message: "Email updated."});
        }).catch((err) => {
            res.status(500).json({error: err.message});
        });
    } else {
        res.status(400).json({error: "Email is not valid."});
    }
}

/**
 * Handles POST requests to /account/picture
 *
 * Must be preceded by the authMiddleware
 *
 * Updates the picture of the user
 * @param req The request
 * @param res The response
 */
export function updatePicture(req: Request, res: Response) {

    const link = req.body.link;
    if (imagesService.isImageSafe(link)) {
        accountService.updatePicture(req["user"]["_id"], link).then(() => {
            res.status(200).json({message: "Link updated."});
        }).catch((err) => {
            res.status(500).json({error: err.message});
        });
    } else {
        res.status(400).json({error: "Link is not valid."});
    }
}

/**
 * Handles DELETE requests to /account/picture
 *
 * Must be preceded by the authMiddleware
 *
 * Deletes the profile picture of the user
 * @param req The request
 * @param res The response
 */
export function deletePicture(req: Request, res: Response) {
    accountService.deletePicture(req["user"]["_id"]).then(() => {
        res.status(200).json({message: "Picture removed."});
    }).catch((err) => {
        res.status(500).json({error: err.message});
    });
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
export function deleteAccount(req: Request, res: Response) {

    accountService.deleteAccount(req["user"]["_id"]).then(() => {
        res.status(200).json({message: "Account deleted."});
    }).catch((err) => {
        res.status(500).json({error: err.message});
    });
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
export function addDiscordAccount(req: Request, res: Response) {

    accountService.addDiscordAccount(req["user"]["_id"], req.body.code).then((username) => {
        res.status(200).json({username: username});
    }).catch((err) => {
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
        }
    });
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
export function removeDiscordAccount(req: Request, res: Response) {

    accountService.removeDiscordAccount(req["user"]["_id"]).then(() => {
        res.status(200).json({message: "Discord account removed."});
    }).catch((err) => {
        if (err.message === "User does not have a discord account")
            res.status(409).json({error: "User does not have a discord account"});
        else
            res.status(500).json({error: "Internal server error"});
    });
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
export function getDiscordName(req: Request, res: Response) {

    accountService.getDiscordName(req["user"]["_id"]).then((discordName) => {
        res.status(200).json({discordName});
    }).catch((err) => {
        if (err.message === "User does not have a discord account")
            res.status(404).json({error: "User does not have a discord account"});
        else
            res.status(500).json({error: "Internal server error"});
    });
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
export function getDiscordPicture(req: Request, res: Response) {

    accountService.getDiscordPicture(req["user"]["_id"]).then((discordPicture) => {
        res.status(200).json({discordPicture});
    }).catch((err) => {
        if (err.message === "User does not have a discord account")
            res.status(404).json({error: "User does not have a discord account"});
        else
            res.status(500).json({error: "Internal server error"});
    });
}
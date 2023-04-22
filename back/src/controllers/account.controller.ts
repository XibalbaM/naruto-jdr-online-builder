import {Request, Response} from "express";

import * as accountService from "../services/account.service.js";
import * as imagesService from "../services/images.service.js";
import config from "../config/env.js";

/**
 * Handles GET requests to /auth/user
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
 * Handles POST requests to /auth/username
 *
 * Must be preceded by the authMiddleware
 *
 * Updates the username of the user
 * @param req The request
 * @param res The response
 */
export function updateUsername(req: Request, res: Response) {

    const username = req.body.username;
    if (username) {
        if (username.length >= config.user.username.minLength && username.length <= config.user.username.maxLength) {
            accountService.updateUsername(req["user"]["id"], username).then(() => {
                res.status(200).json({message: "Username updated."});
            }).catch((err) => {
                res.status(500).json({error: err.message});
            });
        } else {
            res.status(400).json({error: `Username must be between ${config.user.username.minLength} and ${config.user.username.maxLength} characters.`});
        }
    } else {
        res.status(400).json({error: "Username is required."});
    }
}

/**
 * Handles POST requests to /auth/email
 *
 * Must be preceded by the authMiddleware
 *
 * Updates the email of the user
 * @param req The request
 * @param res The response
 */
export function updateEmail(req: Request, res: Response) {

    const email = req.body.email;
    if (email) {
        if (email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            accountService.updateEmail(req["user"]["id"], email).then(() => {
                res.status(200).json({message: "Email updated."});
            }).catch((err) => {
                res.status(500).json({error: err.message});
            });
        } else {
            res.status(400).json({error: "Email is not valid."});
        }
    } else {
        res.status(400).json({error: "Email is required."});
    }
}

export function updatePicture(req: Request, res: Response) {

    const link = req.body.link;
    if (link) {
        if (imagesService.isImageSafe(link)) {
            accountService.updatePicture(req["user"]["id"], link).then(() => {
                res.status(200).json({message: "Link updated."});
            }).catch((err) => {
                res.status(500).json({error: err.message});
            });
        } else {
            res.status(400).json({error: "Link is not valid."});
        }
    } else {
        res.status(400).json({error: "Link is required."});
    }
}

export function deletePicture(req: Request, res: Response) {
    accountService.deletePicture(req["user"]["id"]).then(() => {
        res.status(200).json({message: "Picture removed."});
    }).catch((err) => {
        res.status(500).json({error: err.message});
    });
}

export function deleteAccount(req: Request, res: Response) {

    res.status(501).json({message: "Not implemented"});
}
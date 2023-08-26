import {Request, Response} from "express";
import PredrawnService from "../services/predrawn.service.js";

export default class PredrawnController {

    /**
     * Get the list of predrawn characters' ids.
     */
    static list(req: Request, res: Response) {
        PredrawnService.getAll().then((characters) => {
            res.status(200).json({characters});
        });
    }

    /**
     * Take a copy of a predrawn character.
     * It will be added to the user's characters.
     *
     * The character id must be in the url.
     *
     * The user must be logged in.
     */
    static take(req: Request, res: Response) {
        PredrawnService.take(req['user']._id, req.params.id).then((character) => {
            res.status(201).json({character});
        }).catch((error) => {
            res.status(400).json({error: error.message});
        });
    }

    /**
     * Add a character to the predrawn list.
     *
     * The character id must be in the body of the request.
     *
     * The user must be logged in and be an admin.
     */
    static add(req: Request, res: Response) {
        PredrawnService.add(req.body.id).then((id) => {
            res.status(201).json({id});
        }).catch((error) => {
            res.status(400).json({error: error.message});
        });
    }

    /**
     * Remove a character from the predrawn list.
     *
     * The user must be logged in and be an admin.
     */
    static remove(req: Request, res: Response) {
        PredrawnService.remove(req.params.id).then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            res.status(400).json({error: error.message});
        });
    }
}
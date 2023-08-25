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
     * Add a character to the predrawn list.
     *
     * The character id must be in the body of the request.
     *
     * The user must be logged in and be an admin.
     */
    static add(req: Request, res: Response) {
        PredrawnService.add(req.body.id).then(() => {
            res.sendStatus(201);
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
        });
    }
}
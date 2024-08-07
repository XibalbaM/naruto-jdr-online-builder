import {Request, Response} from "express";
import PredrawnService from "../services/predrawn.service.js";

export default class PredrawnController {

    /**
     * Get the list of predrawn characters' ids.
     */
    static async list(req: Request, res: Response) {
        res.status(200).json({characters: await PredrawnService.getAll()});
    }

    /**
     * Take a copy of a predrawn character.
     * It will be added to the user's characters.
     *
     * The character id must be in the url.
     *
     * The user must be logged in.
     */
    static async take(req: Request, res: Response) {
        try {
            res.status(201).json({character: await PredrawnService.take(req.user!, req.params["id"])});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    /**
     * Add a character to the predrawn list.
     *
     * The character id must be in the body of the request.
     *
     * The user must be logged in and be an admin.
     */
    static async add(req: Request, res: Response) {
        try {
            res.status(201).json({id: await PredrawnService.add(req.body.id)});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    /**
     * Remove a character from the predrawn list.
     *
     * The user must be logged in and be an admin.
     */
    static async remove(req: Request, res: Response) {
        try {
            await PredrawnService.remove(req.params["id"])
            res.sendStatus(200);
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }
}
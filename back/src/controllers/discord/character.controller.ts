import {Request, Response} from "express";
import CharactersService from "../../services/characters.service.js";

export default class DiscordCharacterController {
    static async list(req: Request, res: Response) {
        try {
            const characters = await CharactersService.summaryCharacters(req.user!);
            res.status(200).json(characters);
        } catch (e: any) {
            res.status(500).json({message: e.message});
        }
    }

    static async get(req: Request, res: Response) {
        try {
            const character = await CharactersService.getCharacter(req.user!, req.params["id"]);
            res.status(200).json(character);
        } catch (e: any) {
            res.status(500).json({message: e.message});
        }
    }
}
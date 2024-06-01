import CharactersService from "../../services/characters.service.js";

export default class DiscordCharacterController {
    static async list(req, res) {
        try {
            const characters = await CharactersService.summaryCharacters(req.user);
            res.status(200).json(characters);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }

    static async get(req, res) {
        try {
            const character = await CharactersService.getCharacter(req.user, req.params.id);
            res.status(200).json(character);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
}
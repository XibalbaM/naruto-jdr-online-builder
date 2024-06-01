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
}
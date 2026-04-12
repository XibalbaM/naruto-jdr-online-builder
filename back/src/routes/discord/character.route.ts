import {Router} from "express";
import discordAuthMiddleware from "../../middlewares/security/discord-auth.middleware.js";
import DiscordCharacterController from "../../controllers/discord/character.controller.js";
import idOfMiddleware from "../../middlewares/id-of.middleware.js";
import CharacterModel from "../../models/character.model.js";
import contentMiddleware from "../../middlewares/content.middleware.js";
import * as charactersController from "../../controllers/characters.controller.js";

/**
 * The router for the /discord/auth path.
 * @type {Router}
 */
const router = Router();

router.get('/', discordAuthMiddleware(), DiscordCharacterController.list);
router.get('/:id', discordAuthMiddleware(), DiscordCharacterController.get);
router.post('/:id/nindoPoints', discordAuthMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({points: 42}), charactersController.setNindoPoints);
router.post('/:id/activeChakraAmount', discordAuthMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({amount: 42}), charactersController.setActiveChakraAmount);
router.post('/:id/nindoCharges', discordAuthMiddleware(), idOfMiddleware(CharacterModel, "id"), contentMiddleware({charges: 42}), charactersController.setNindoCharges);


export default router;
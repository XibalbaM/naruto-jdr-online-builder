import {Router} from "express";
import contentMiddleware from "../../middlewares/content.middleware";
import discordAuthMiddleware from "../../middlewares/security/discord-auth.middleware";
import DiscordCharacterController from "../../controllers/discord/character.controller";

/**
 * The router for the /discord/auth path.
 * @type {Router}
 */
const router = Router();

router.get('/', discordAuthMiddleware(), DiscordCharacterController.list);

export default router;
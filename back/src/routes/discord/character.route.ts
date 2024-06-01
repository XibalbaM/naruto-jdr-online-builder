import {Router} from "express";
import discordAuthMiddleware from "../../middlewares/security/discord-auth.middleware.js";
import DiscordCharacterController from "../../controllers/discord/character.controller.js";

/**
 * The router for the /discord/auth path.
 * @type {Router}
 */
const router = Router();

router.get('/', discordAuthMiddleware(), DiscordCharacterController.list);
router.get('/:id', discordAuthMiddleware(), DiscordCharacterController.get);

export default router;
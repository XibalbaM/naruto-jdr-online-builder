import {Router} from "express";

import * as accountController from "../../controllers/account.controller.js";
import discordAuthMiddleware from "../../middlewares/security/discord-auth.middleware.js";
import * as userController from "../../controllers/discord/user.controller.js";

/**
 * The router for the /discord/user path.
 * @type {Router}
 */
const router = Router();

router.get('/linked', discordAuthMiddleware(), userController.discordIdLinked);
router.get('/exists/:email', userController.onlineAccountExists);
router.delete('/', discordAuthMiddleware(), accountController.removeDiscordAccount);

export default router;
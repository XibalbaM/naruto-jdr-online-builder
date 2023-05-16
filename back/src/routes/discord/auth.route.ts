import {Router} from "express";

import * as discordAuthController from "../../controllers/discord/auth.controller.js";
import contentMiddleware from "../../middlewares/content.middleware.js";

/**
 * The router for the /discord/auth path.
 * @type {Router}
 */
const router = Router();

router.post('/', contentMiddleware({email: "email", discordId: "discordId"}), discordAuthController.requestDiscordAccountConnection);

export default router;
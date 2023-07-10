import {Router} from "express";

import * as groupsController from "../../controllers/groups.controller.js";
import discordAuthMiddleware from "../../middlewares/security/discord-auth.middleware.js";
import contentMiddleware from "../../middlewares/content.middleware.js";
import idOfMiddleware from "../../middlewares/id-of.middleware.js";
import GroupModel from "../../models/group.model.js";

/**
 * The router for the /discord/groups path.
 * @type {Router}
 */
const router = Router();

router.get('/', discordAuthMiddleware(), groupsController.list);
router.get('/select', discordAuthMiddleware(), groupsController.getSelected)
router.post('/select', discordAuthMiddleware(), contentMiddleware({commandId: 42}), groupsController.select);
router.get('/:id', discordAuthMiddleware(), idOfMiddleware(GroupModel, "id"), groupsController.get);

export default router;
import {Router} from "express";

import authMiddleware from "../middlewares/security/auth.middleware.js";
import * as groupsController from "../controllers/groups.controller.js";
import contentMiddleware from "../middlewares/content.middleware.js";
import idOfMiddleware from "../middlewares/id-of.middleware.js";
import GroupModel from "../models/group.model.js";
import captchaMiddleware from "../middlewares/security/captcha.middleware.js";

/**
 * The router for the /groups path.
 * @type {Router}
 */
const router = Router();

router.post('/', captchaMiddleware(), contentMiddleware({name: "name", village: undefined}), authMiddleware(), groupsController.create);
router.get('/', authMiddleware(), groupsController.list);
router.get('/:id', authMiddleware(), idOfMiddleware(GroupModel, "id"), groupsController.get);

export default router;
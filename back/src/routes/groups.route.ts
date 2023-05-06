import {Router} from "express";

import authMiddleware from "../middlewares/security/auth.middleware.js";
import * as groupsController from "../controllers/groups.controller.js";
import contentMiddleware from "../middlewares/content.middleware.js";

/**
 * The router for the /groups path.
 * @type {Router}
 */
const router = Router();

router.post('/', contentMiddleware({name: "name"}), authMiddleware(), groupsController.create);
router.get('/', authMiddleware(), groupsController.list);
router.get('/:id', authMiddleware(), groupsController.get);

export default router;
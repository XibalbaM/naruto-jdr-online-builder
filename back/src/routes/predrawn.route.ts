import {Router} from "express";

import authMiddleware from "../middlewares/security/auth.middleware.js";
import contentMiddleware from "../middlewares/content.middleware.js";
import adminMiddleware from "../middlewares/security/admin.middleware.js";
import PredrawnController from "../controllers/predrawn.controller.js";
import idOfMiddleware from "../middlewares/id-of.middleware.js";
import CharacterModel from "../models/character.model.js";

/**
 * The router for the /predrawn path.
 * @type {Router}
 */
const router = Router();

router.post('/', contentMiddleware({id: "id"}), idOfMiddleware(CharacterModel, "id", true), authMiddleware(), adminMiddleware(), PredrawnController.add);
router.delete('/:id', idOfMiddleware(CharacterModel, "id"), authMiddleware(), adminMiddleware(), PredrawnController.remove);
router.get('/', PredrawnController.list);

export default router;
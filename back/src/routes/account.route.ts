import {Router} from "express";

import authMiddleware from "../middlewares/security/auth.middleware";
import * as accountController from "../controllers/account.controller.js";
import contentMiddleware from "../middlewares/content.middleware.js";

/**
 * The router for the /account path.
 */
const router = Router();

router.get('/', authMiddleware(), accountController.getUser);
router.delete('/', authMiddleware(), accountController.deleteAccount);
router.post('/username', contentMiddleware({username: "username"}), authMiddleware(), accountController.updateUsername);
router.post('/email', contentMiddleware({email: "email"}), authMiddleware(), accountController.updateEmail);
router.post('/discord', contentMiddleware({code: "code"}), authMiddleware(), accountController.addDiscordAccount);
router.delete('/discord', authMiddleware(), accountController.removeDiscordAccount);
router.get('/discord/name', authMiddleware(), accountController.getDiscordName);
router.get('/discord/picture', authMiddleware(), accountController.getDiscordPicture);

export default router;
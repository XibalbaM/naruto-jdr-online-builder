import {Router} from "express";

import authMiddleware from "../middlewares/security/auth.middleware.js";
import * as accountController from "../controllers/account.controller.js";
import contentMiddleware from "../middlewares/content.middleware.js";

/**
 * The router for the /account path.
 * @type {Router}
 */
const router = Router();

router.get('/', authMiddleware(), accountController.getUser);
router.delete('/', authMiddleware(), accountController.deleteAccount);
router.post('/username', contentMiddleware({username: "username"}), authMiddleware(), accountController.updateUsername);
router.post('/email', contentMiddleware({email: "email"}), authMiddleware(), accountController.updateEmail);
router.post('/picture', contentMiddleware({link: "link"}), authMiddleware(), accountController.updatePicture);
router.delete('/picture', authMiddleware(), accountController.deletePicture);

export default router;
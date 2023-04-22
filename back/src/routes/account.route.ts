import {Router} from "express";

import authMiddleware from "../middlewares/security/auth.middleware.js";
import * as accountController from "../controllers/account.controller.js";

/**
 * The router for the /account path.
 * @type {Router}
 */
const router = Router();

router.get('/', authMiddleware(), accountController.getUser);
router.post('/username', authMiddleware(), accountController.updateUsername);
router.post('/email', authMiddleware(), accountController.updateEmail);
router.post('/picture', authMiddleware(), accountController.updatePicture);
router.delete('/picture', authMiddleware(), accountController.deletePicture);
router.delete('/', authMiddleware(), accountController.deleteAccount);

export default router;
import {Router} from "express";

import * as authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/security/auth.middleware.js";

const router = Router();

router.post('/', authController.requireEmail);
router.post('/refresh', authMiddleware(), authController.refreshToken);
router.get('/:code', authController.login);

export default router;
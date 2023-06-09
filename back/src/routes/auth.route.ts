import {Router} from "express";

import * as authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/security/auth.middleware.js";
import contentMiddleware from "../middlewares/content.middleware.js";
import captchaMiddleware from "../middlewares/security/captcha.middleware.js";

/**
 * The router for the /auth path.
 * @type {Router}
 */
const router = Router();

router.post('/', captchaMiddleware(), contentMiddleware({email: "email"}), authController.requestEmail);
router.get('/refresh', authMiddleware(), authController.refreshToken);
router.get('/:code', authController.login);

export default router;
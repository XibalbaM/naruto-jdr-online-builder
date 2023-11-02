import {Router} from "express";

import * as authController from "../controllers/auth.controller.js";
import captchaMiddleware from "../middlewares/security/captcha.middleware.js";

/**
 * The router for the /auth path.
 * @type {Router}
 */
const router = Router();

router.post('/', captchaMiddleware(), authController.requestEmail);
router.get('/logout', authController.logout);
router.get('/:code', authController.login);

export default router;
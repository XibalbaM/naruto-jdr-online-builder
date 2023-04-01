import {Router} from "express";

import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post('/', authController.requireEmail);
router.get('/:code', authController.login);

export default router;
import {Router} from "express";

import userRoute from "./discord/user.route.js";
import authRoute from "./discord/auth.route.js";

/**
 * The router for the /discord path.
 * @type {Router}
 */
const router = Router();

router.use('/user', userRoute);
router.use('/auth', authRoute)

export default router;
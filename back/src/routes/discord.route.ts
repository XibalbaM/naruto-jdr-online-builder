import {Router} from "express";

import userRoute from "./discord/user.route.js";
import authRoute from "./discord/auth.route.js";
import groupsRoute from "./discord/groups.route.js";
import characterRoute from "./discord/character.route";

/**
 * The router for the /discord path.
 * @type {Router}
 */
const router = Router();

router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/groups', groupsRoute)
router.use('/characters', characterRoute)

export default router;
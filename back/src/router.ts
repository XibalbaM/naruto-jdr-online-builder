import express, { Router } from 'express';
import path from 'path';

import authRoute from './routes/auth.route.js';
import accountRoute from "./routes/account.route.js";
import groupsRoute from "./routes/groups.route.js";

/**
 * The main router of the api.
 *
 * Redirects to the different routers of the api.
 * @type {Router}
 */
const router = Router();

router.use('/auth', authRoute);
router.use('/account', accountRoute);
router.use('/groups', groupsRoute);
router.use('/assets', express.static(path.resolve('assets')));

export default router;
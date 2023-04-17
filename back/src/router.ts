import { Router } from 'express';

import authRoute from './routes/auth.route.js';

/**
 * The main router of the api.
 *
 * Redirects to the different routers of the api.
 * @type {Router}
 */
const router = Router();

router.use('/auth', authRoute);

export default router;
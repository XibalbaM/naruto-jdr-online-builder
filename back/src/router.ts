import express, { Router } from 'express';
import * as url from 'url';

import authRoute from './routes/auth.route.js';

/**
 * The main router of the api.
 *
 * Redirects to the different routers of the api.
 * @type {Router}
 */
const router = Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

router.use('/auth', authRoute);
router.use('/assets', express.static(__dirname + '../assets'))

export default router;
import { Router } from 'express';

import authRoute from './routes/auth.route.js';

const router = Router();

router.use('/auth', authRoute);

export default router;
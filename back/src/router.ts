import { Router } from 'express';

import userRoute from './routes/auth.route.js';

const router = Router();

router.use('/auth', userRoute);

export default router;
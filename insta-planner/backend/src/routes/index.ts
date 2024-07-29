import { Router } from 'express';
import authRoutes from './auth';

const router = Router();

router.use('/api', authRoutes);

export default router;

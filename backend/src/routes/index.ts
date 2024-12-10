import { Router } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import { loginSchema, refreshTokenSchema, requestPasswordResetSchema, resetPasswordSchema, socialLoginSchema } from '../validators/auth.validator';
import { loginRateLimiter } from '../middleware/rateLimiter';

export const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', loginRateLimiter, validateRequest(loginSchema), authController.login);
authRouter.post('/social-login', validateRequest(socialLoginSchema), authController.socialLogin);
authRouter.post('/refresh', validateRequest(refreshTokenSchema), authController.refresh);
authRouter.post('/logout', validateRequest(refreshTokenSchema), authController.logout);
authRouter.post('/request-reset', validateRequest(requestPasswordResetSchema), authController.requestPasswordReset);
authRouter.post('/reset-password', validateRequest(resetPasswordSchema), authController.resetPassword);
authRouter.post('/2fa/setup', authController.setup2FA);
authRouter.post('/2fa/verify', authController.verify2FA);
authRouter.post('/2fa/enable', authController.enable2FA);
authRouter.post('/2fa/disable', authController.disable2FA);
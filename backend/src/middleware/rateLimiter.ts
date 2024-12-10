import rateLimit from 'express-rate-limit';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Login attempt limiter
const loginLimiter = new RateLimiterMemory({
  points: 5, // Number of attempts
  duration: 60 * 60, // Per hour
});

export const loginRateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    await loginLimiter.consume(ip);
    next();
  } catch (error) {
    res.status(429).json({
      message: 'Too many login attempts, please try again later'
    });
  }
};
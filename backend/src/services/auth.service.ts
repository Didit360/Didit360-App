import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { LoginCredentials, AuthResponse, JwtPayload, RequestPasswordResetInput, ResetPasswordInput, TokenResponse, SocialLoginInput } from '../types/auth';
import { AppError } from '../utils/appError';
import { sendResetPasswordEmail } from '../utils/email';
import { verifySocialToken } from '../utils/socialAuth';

export class AuthService {
  private readonly jwtSecret: string;
  private readonly refreshSecret: string;

  constructor() {
    const secret = process.env.JWT_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    
    if (!secret || !refreshSecret) {
      throw new Error('JWT secrets are not defined');
    }
    
    this.jwtSecret = secret;
    this.refreshSecret = refreshSecret;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email: credentials.email });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await user.comparePassword(credentials.password);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = this.generateAccessToken(user.id, user.email);
    const refreshToken = this.generateRefreshToken(user.id, user.email);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    };
  }

  async socialLogin(payload: SocialLoginInput): Promise<AuthResponse> {
    const socialUser = await verifySocialToken(payload);
    
    let user = await UserModel.findOne({ email: socialUser.email });
    
    if (!user) {
      user = await UserModel.create({
        email: socialUser.email,
        name: socialUser.name,
        socialProvider: payload.provider,
        socialId: socialUser.id
      });
    }

    const token = this.generateAccessToken(user.id, user.email);
    const refreshToken = this.generateRefreshToken(user.id, user.email);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    };
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      const payload = jwt.verify(refreshToken, this.refreshSecret) as JwtPayload;
      if (payload.type !== 'refresh') {
        throw new AppError('Invalid token type', 401);
      }

      const user = await UserModel.findById(payload.userId);
      if (!user || user.refreshToken !== refreshToken) {
        throw new AppError('Invalid refresh token', 401);
      }

      const newToken = this.generateAccessToken(user.id, user.email);
      const newRefreshToken = this.generateRefreshToken(user.id, user.email);

      user.refreshToken = newRefreshToken;
      await user.save();

      return {
        token: newToken,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  async logout(refreshToken: string): Promise<void> {
    const user = await UserModel.findOne({ refreshToken });
    if (user) {
      user.refreshToken = undefined;
      await user.save();
    }
  }

  private generateAccessToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email, type: 'access' },
      this.jwtSecret,
      { expiresIn: '15m' }
    );
  }

  private generateRefreshToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email, type: 'refresh' },
      this.refreshSecret,
      { expiresIn: '7d' }
    );
  }
}
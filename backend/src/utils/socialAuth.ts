import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { SocialLoginInput } from '../types/auth';
import { AppError } from './appError';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface SocialUser {
  id: string;
  email: string;
  name: string;
}

export async function verifySocialToken(payload: SocialLoginInput): Promise<SocialUser> {
  switch (payload.provider) {
    case 'google':
      return verifyGoogleToken(payload.token);
    case 'facebook':
      return verifyFacebookToken(payload.token);
    default:
      throw new AppError('Unsupported social provider', 400);
  }
}

async function verifyGoogleToken(token: string): Promise<SocialUser> {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error('Invalid token payload');
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name || ''
    };
  } catch (error) {
    throw new AppError('Invalid Google token', 401);
  }
}

async function verifyFacebookToken(token: string): Promise<SocialUser> {
  try {
    const response = await axios.get(`https://graph.facebook.com/me`, {
      params: {
        fields: 'id,email,name',
        access_token: token
      }
    });

    const { id, email, name } = response.data;
    if (!email) {
      throw new Error('Email not provided');
    }

    return { id, email, name };
  } catch (error) {
    throw new AppError('Invalid Facebook token', 401);
  }
}
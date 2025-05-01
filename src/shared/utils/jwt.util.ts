import jwt from 'jsonwebtoken';
import { env } from '../../configs/env';

/**
 * Generate JWT token
 */
export function generateToken(payload: { id: string; email: string }) {
    return jwt.sign(
        {
            id: payload.id,
            email: payload.email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 // expired dalam 1 jam
        },
        env.JWT_SECRET,
        { algorithm: 'HS256' }
    );
}

/**
 * Verify dan decode JWT token
 */
export function verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET);
}
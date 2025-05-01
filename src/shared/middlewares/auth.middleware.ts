import { Context, Next } from 'koa';
import { verifyToken } from '../utils/jwt.util';
import { errorResponse } from '../utils/response.util';

export async function authMiddleware(ctx: Context, next: Next) {
    const authHeader = ctx.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(ctx, null, 'Missing or invalid token', 401);
    }

    const token = authHeader.split(' ')[1];

    // if (isBlacklisted(token)) {
    //     return errorResponse(ctx, 'Token has been revoked', 401);
    // }

    try {
        const decoded = verifyToken(token);
        ctx.state.user = decoded;
        await next();
    } catch (e) {
        return errorResponse(ctx, null,'Invalid or expired token', 401);
    }
}
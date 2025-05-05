import { AuthTokenValidation } from './../../shared/validations/auth-token.validation';

import { Context } from 'koa';
import { successResponse, errorResponse } from '../../shared/utils/response.util';
import { authTokenUseCase } from '../../shared/usecases/auth/auth-token.use-case';
import { authRefreshUseCase } from '../../shared/usecases/auth/auth-refresh.use-case';

export const handleAuthToken = async (ctx: Context) => {
    try {
        const auth = await authTokenUseCase(ctx.request.body as AuthTokenValidation)
        successResponse(ctx, auth, 'Auth successfully', 200);
    } catch (err: any) {
        errorResponse(ctx, null, err.message, 400);
    }
}

export const handleAuthMe = async (ctx: Context) => {
    try {

        const { id, email } = ctx.state.user;

        successResponse(ctx, {
            user: {id, email}
        }, 'Auth successfully', 200);
    } catch (err: any) {
        errorResponse(ctx, null, err.message, 400);
    }
}

export const handleAuthRefresh = async (ctx: Context) => {
        try {
            const user = ctx.state.user; // Harus sudah diattach di middleware auth

            if (!user) {
                return errorResponse(ctx, null, 'Unauthorized', 401);
            }

            const newToken = await authRefreshUseCase({
                id: user.id,
                email: user.email
            });

            successResponse(ctx, { token: newToken }, 'Token refreshed', 200);
        } catch (err: any) {
            errorResponse(ctx, null, err.message || 'Failed to refresh token', 500);
        }
}

export const handleCheckParams = async (ctx: Context) => {
    const flag = ctx.params.flag;

    if (!/^[A-Za-z]+$/.test(flag)) {
        return errorResponse(ctx, null, 'Invalid params flag only alphabet allowed', 400);
    }

    successResponse(ctx, {
        flag
    }, 'Check Params');
}
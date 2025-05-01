
import { Context } from 'koa';
import { userCreateUseCase } from '../../shared/usecases/user-create.use-case';
import { successResponse, errorResponse } from '../../shared/utils/response.util';
import { authTokenUseCase } from '../../shared/usecases/auth-token.use-case';
import { AuthLoginRequest } from '../../shared/validations/auth-token.validation';
import { authRefreshUseCase } from '../../shared/usecases/auth-refresh.use-case';

export async function handleAuthToken(ctx: Context) {
    try {
        const auth = await authTokenUseCase(ctx.request.body as AuthLoginRequest)
        successResponse(ctx, auth, 'Auth successfully', 200);
    } catch (err: any) {
        errorResponse(ctx, null, err.message, 400);
    }
}

export async function handleAuthMe(ctx: Context) {
    try {

        const { id, email } = ctx.state.user;

        successResponse(ctx, {
            user: {id, email}
        }, 'Auth successfully', 200);
    } catch (err: any) {
        errorResponse(ctx, null, err.message, 400);
    }
}

export async function handleAuthRefresh(ctx: Context) {
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

    if (!flag) {
        return errorResponse(ctx, null, 'Missing params flag', 400);
    }

    successResponse(ctx, {
        flag
    }, 'Check Params');
}
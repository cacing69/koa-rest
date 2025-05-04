
import { Context } from 'koa';
import { userCreateUseCase } from '../../shared/usecases/user/user-create.use-case';
import { successResponse, errorResponse } from '../../shared/utils/response.util';
import { UserCreateValidationRequest } from '../../shared/validations/user-create.validation';

export async function handleCreateUser(ctx: Context) {
    try {
        const user = await userCreateUseCase(ctx.request.body as UserCreateValidationRequest);
        successResponse(ctx, null, 'User created successfully', 201);
    } catch (err: any) {
        errorResponse(ctx, null, err.message, 400);
    }
}
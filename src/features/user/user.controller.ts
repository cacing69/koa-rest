
import { Context } from 'koa';
import { userCreateUseCase } from '../../shared/usecases/user/user-create.use-case';
import { successResponse, errorResponse } from '../../shared/utils/response.util';
import { UserCreateValidation } from '../../shared/validations/user-create.validation';
import { userPaginateUseCase } from '../../shared/usecases/user/user-paginate.use-case';
import { PaginateValidation } from '../../shared/validations/paginate.validation';

export async function handlePaginateUser(ctx: Context) {
    try {
        const paginate = await userPaginateUseCase(ctx.request.body as PaginateValidation);

        successResponse(ctx, null, 'User created successfully', 201);
    } catch (err: any) {
        errorResponse(ctx, null, err.message, 400);
    }
}

export async function handleCreateUser(ctx: Context) {
    try {
        const user = await userCreateUseCase(ctx.request.body as UserCreateValidation);
        successResponse(ctx, null, 'User created successfully', 201);
    } catch (err: any) {
        errorResponse(ctx, null, err.message, 400);
    }
}
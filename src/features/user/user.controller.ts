
import { Context } from 'koa';
import { userCreateUseCase } from '../../shared/usecases/user/user-create.use-case';
import { successResponse, errorResponse, successPaginateResponse } from '../../shared/utils/response.util';
import { UserCreateValidation } from '../../shared/validations/user-create.validation';
import { userPaginateUseCase } from '../../shared/usecases/user/user-paginate.use-case';
import { PaginateQuery } from '../../shared/validations/query/paginate.query';
import { UserFilterQuery } from '../../shared/validations/query/user-filter.query';

export const handlePaginateUser = async (ctx: Context) => {
    try {
        const { paginate, meta } = await userPaginateUseCase(
            ctx.request.query as unknown as PaginateQuery,
            ctx.request.query as unknown as UserFilterQuery,
        );

        // const meta = {
        //     nextCursor: paginate[paginate.length - 1].id
        // };

        successPaginateResponse(ctx, paginate, meta,'User data', 200);
    } catch (err: any) {
        errorResponse(ctx, null, err.message, 400);
    }
}

export const handleCreateUser = async (ctx: Context) => {
    try {
        const user = await userCreateUseCase(ctx.request.body as UserCreateValidation);
        successResponse(ctx, null, 'User created successfully', 201);
    } catch (err: any) {
        errorResponse(ctx, null, err.message, 400);
    }
}
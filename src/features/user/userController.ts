
import { registerUser } from '../../shared/usecases/registerUser';
import { successResponse, errorResponse } from '../../shared/utils/response';

export async function registerUserController(ctx: any) {
    try {
        const user = await registerUser(ctx.request.body);
        successResponse(ctx, user, 'User created successfully', 201);
    } catch (err: any) {
        errorResponse(ctx, err.message, 400);
    }
}
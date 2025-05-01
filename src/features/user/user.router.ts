import Router from 'koa-router';
import { validateMiddleware } from '../../shared/middlewares/validate.middleware';
import { handleCreateUser } from './user.controller';
import { userCreateValidation } from '../../shared/validations/user-create.validation';

const userRouter = new Router({ prefix: '/user' });

userRouter.post('/', validateMiddleware(userCreateValidation), handleCreateUser);

export default userRouter;
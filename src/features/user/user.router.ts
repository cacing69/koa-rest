import Router from 'koa-router';
import { validateMiddleware } from '../../shared/middlewares/validate.middleware';
import { handleCreateUser } from './user.controller';
import { userCreateValidation } from '../../shared/validations/user-create.validation';
import { hasPermission, hasRole } from '../../shared/middlewares/acl.middleware';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';

const userRouter = new Router({ prefix: '/user' });

userRouter.post('/', authMiddleware, validateMiddleware(userCreateValidation), hasPermission(['delete-test']), handleCreateUser);

export default userRouter;
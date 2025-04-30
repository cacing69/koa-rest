import Router from 'koa-router';
import { createUserSchema } from './validations/createUserSchema';
import { registerUserController } from './userController';
import { validateMiddleware } from '../../shared/middlewares/validate.middleware';

const router = new Router({ prefix: '/users' });

router.post('/', validateMiddleware(createUserSchema), registerUserController);

export default router;
import Router from 'koa-router';
import { validateMiddleware } from '../../shared/middlewares/validate.middleware';
import { handleCreateUser } from './user.controller';
import { userCreateValidation } from '../../shared/validations/user-create.validation';
import { hasPermission, hasRole } from '../../shared/middlewares/acl.middleware';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';

const userRouter = new Router({ prefix: '/user' });

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create new User
 *     security: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/UserCreateValidation'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/requestBodies/UserCreateValidation'
 *     responses:
 *       201:
 *         description: Created
 */
userRouter.post('/', authMiddleware, validateMiddleware(userCreateValidation), hasPermission(['delete-test']), handleCreateUser);

export default userRouter;
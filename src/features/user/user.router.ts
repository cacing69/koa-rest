import Router from 'koa-router';
import { validateMiddleware } from '../../shared/middlewares/validate.middleware';
import { handleCreateUser, handlePaginateUser } from './user.controller';
import { userCreateValidation } from '../../shared/validations/user-create.validation';
import { hasPermission, hasRole } from '../../shared/middlewares/acl.middleware';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';
import { paginateValidation } from '../../shared/validations/paginate.validation';

const userRouter = new Router({ prefix: '/user' });

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Paginate User
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Created
 */
userRouter.get('/', authMiddleware, validateMiddleware(paginateValidation), handlePaginateUser);

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create new User
 *     security:
 *       - bearerAuth: []
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
userRouter.post('/', authMiddleware, validateMiddleware(userCreateValidation), handleCreateUser);

export default userRouter;
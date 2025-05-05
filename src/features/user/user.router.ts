import Router from 'koa-router';
import { handleCreateUser, handlePaginateUser } from './user.controller';
import { userCreateValidation } from '../../shared/validations/user-create.validation';
import { auth } from '../../shared/middlewares/auth.middleware';
import { paginateQuery } from '../../shared/validations/query/paginate.query';
import { userFilterQuery } from '../../shared/validations/query/user-filter.query';
import { validateQueryParams } from '../../shared/middlewares/validate-query-params.middleware';
import { validateRequestBody } from '../../shared/middlewares/validate-request-body.middleware';

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
userRouter.get('/', auth, validateQueryParams(paginateQuery), validateQueryParams(userFilterQuery), handlePaginateUser);

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
userRouter.post('/', auth, validateRequestBody(userCreateValidation), handleCreateUser);

export default userRouter;
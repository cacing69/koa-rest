import Router from 'koa-router';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';
import {
    handleGetAllRole,
    handleGetRoleById,
    handleUpdateRoleById,
    handleDeleteRoleById
} from './role.controller';

const roleRouter = new Router({ prefix: '/role' });

/**
 * @openapi
 * /role:
 *   get:
 *     summary: Get All Role
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Role
 *     responses:
 *      200:
 *        $ref: '#/components/responses/SuccessResponse'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      405:
 *        $ref: '#/components/responses/MethodNotAllowed'
 *      500:
 *        $ref: '#/components/responses/InternalError'
 */
roleRouter.get('/role', authMiddleware, handleGetAllRole);

/**
 * @openapi
 * /role/{id}:
 *   get:
 *     summary: Get Role By ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Role
 *     parameters:
 *       - $ref: '#/components/parameters/IdPathParam'
 *     responses:
 *      200:
 *        $ref: '#/components/responses/SuccessResponse'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      405:
 *        $ref: '#/components/responses/MethodNotAllowed'
 *      422:
 *        $ref: '#/components/responses/UnprocessableContent'
 *      500:
 *        $ref: '#/components/responses/InternalError'
 */
roleRouter.get('/role/:id', authMiddleware, handleGetRoleById);

/**
 * @openapi
 * /role/{id}:
 *   patch:
 *     summary: Update Role By ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Role
 *     parameters:
 *       - $ref: '#/components/parameters/IdPathParam'
 *     responses:
 *      204:
 *          description: No Content
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      405:
 *        $ref: '#/components/responses/MethodNotAllowed'
 *      422:
 *        $ref: '#/components/responses/UnprocessableContent'
 *      500:
 *        $ref: '#/components/responses/InternalError'
 */
roleRouter.patch('/role/:id', authMiddleware, handleUpdateRoleById);

/**
 * @openapi
 * /role/{id}:
 *   delete:
 *     summary: Delete Role By ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Role
 *     parameters:
 *       - $ref: '#/components/parameters/IdPathParam'
 *     responses:
 *      204:
 *          description: No Content
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      403:
 *        $ref: '#/components/responses/Forbidden'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      405:
 *        $ref: '#/components/responses/MethodNotAllowed'
 *      500:
 *        $ref: '#/components/responses/InternalError'
 */
roleRouter.delete('/role/:id', authMiddleware, handleDeleteRoleById);

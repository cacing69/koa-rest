import Router from 'koa-router';
import { validateMiddleware } from '../../shared/middlewares/validate.middleware';
import { handleAuthToken, handleAuthMe, handleAuthRefresh, handleCheckParams } from './auth.controller';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';
import { authTokenValidation } from '../../shared/validations/auth-token.validation';

const authRouter = new Router({ prefix: '/auth' });

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Check currrent user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Authentication
 *     responses:
 *      200:
 *          description: User profile
 *      401:
 *          description: Unauthorized
 */
authRouter.get('/me', authMiddleware, handleAuthMe);

/**
 * @openapi
 * /auth/token:
 *   post:
 *     summary: Login user and generate JWT token
 *     security: []
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/AuthTokenValidation'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/requestBodies/AuthTokenValidation'
 *     responses:
 *       200:
 *         description: Success login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/AuthTokenResponse'
 */
authRouter.post('/token', validateMiddleware(authTokenValidation), handleAuthToken);


/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     security: []
 *     tags:
 *      - Authentication
 *     summary: Generate new JWT token
 */
authRouter.post('/refresh', authMiddleware, handleAuthRefresh);

/**
 * @openapi
 * /auth/check/{flag}:
 *   get:
 *     summary: Check flag user for testing purpose only
 *     security: []
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: flag
 *         schema:
 *           type: string
 *         required: true
 *         description: String flag check
 *     responses:
 *      200:
 *          description: User profile
 */
authRouter.get('/check/:flag', handleCheckParams);

export default authRouter;
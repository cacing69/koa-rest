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
 *       - BearerAuth: []
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
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthTokenValidation'
 *     responses:
 *       200:
 *         description: Success login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthTokenResponse'
 */
authRouter.post('/token', validateMiddleware(authTokenValidation), handleAuthToken);


/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags:
 *      - Authentication
 *     summary: Login user and generate JWT token
 */
authRouter.post('/refresh', authMiddleware, handleAuthRefresh);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags:
 *      - Authentication
 *     summary: Login user and generate JWT token
 */
authRouter.get('/check/:flag', handleCheckParams);

export default authRouter;
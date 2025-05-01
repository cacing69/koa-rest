import Router from 'koa-router';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';

const authRouter = new Router({ prefix: '/auth' });

/**
 * @openapi
 * /profile:
 *   get:
 *     summary: Check currrent user
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Profile
 *     responses:
 *      200:
 *          description:
 *      401:
 *          description: Unauthorized
 */
authRouter.get('/profile', authMiddleware, () => { });

/**
 * @openapi
 * /profile/avatar:
 *   post:
 *     summary: Upload avatar
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Profile
 *     responses:
 *      200:
 *          description:
 *      401:
 *          description: Unauthorized
 */
authRouter.post('/profile/avatar', authMiddleware, () => { });

export default authRouter;
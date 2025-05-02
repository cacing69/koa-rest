import Router from 'koa-router';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';

const authRouter = new Router({ prefix: '/auth' });

/**
 * @openapi
 * /profile:
 *   get:
 *     summary: Check currrent user
 *     security:
 *       - bearerAuth: []
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
 *     summary: Upload an Avatar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              avatar:
 *                type: string
 *                format: binary
 *                description: Gambar avatar pengguna
 *            required:
 *              - avatar
 *        encoding:
 *          avatar:
 *              contentType: image/*
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
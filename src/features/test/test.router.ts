import Router from "koa-router";
import { handlePublic } from "./test.controller";

const testRouter = new Router({ prefix: "/test" });

/**
 * @openapi
 * /test/public:
 *   get:
 *     summary: Check currrent user
 *     tags:
 *       - Test
 *     responses:
 *      200:
 *          description: User profile
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TestPublicResponse'
 *      401:
 *          description: Unauthorized
 */
testRouter.get("/public", handlePublic);

export default testRouter;

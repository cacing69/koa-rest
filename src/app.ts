import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import userRouter from './features/user/user.router';
import { errorHandlerMiddleware } from './shared/middlewares/error-handler.middleware';
import authRouter from './features/auth/auth.router';
import swaggerMiddleware from './shared/middlewares/swagger.middleware';
import { DATABASE_URL } from './configs/env.config';

const app = new Koa();

app.use(errorHandlerMiddleware)
app.use(bodyParser());
app.use(swaggerMiddleware);


app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(authRouter.routes()).use(userRouter.allowedMethods());

// Set ke process.env agar Prisma bisa baca juga
process.env.DATABASE_URL = DATABASE_URL;

export default app;
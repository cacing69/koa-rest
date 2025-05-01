import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import userRouter from './features/user/user.router';
import { errorHandlerMiddleware } from './shared/middlewares/error-handler.middleware';
import authRouter from './features/auth/auth.router';
import swaggerMiddleware from './shared/middlewares/swagger.middleware';

const app = new Koa();

app.use(errorHandlerMiddleware)
app.use(bodyParser());
app.use(swaggerMiddleware);


app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(authRouter.routes()).use(userRouter.allowedMethods());

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Visit http://localhost:${PORT}/docs for Swagger UI`);
});
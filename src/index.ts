import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import userRouter from './features/user/routes';

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// import koaWinston from 'koa-winston';
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { errorHandlerMiddleware } from "./shared/middlewares/error-handler.middleware";
import swaggerMiddleware from "./shared/middlewares/swagger.middleware";
import koaCors from 'koa2-cors';
import serve from 'koa-static';

import authRouter from "./features/auth/auth.router";
import testRouter from './features/test/test.router';
import userRouter from "./features/user/user.router";
import path from 'path';
import koaHelmet from 'koa-helmet';

const app = new Koa();

app.use(errorHandlerMiddleware);
app.use(bodyParser());
// Mengonfigurasi middleware CORS
app.use(koaCors({
    origin: '*', // Izinkan semua origin (bisa disesuaikan sesuai kebutuhan)
    allowMethods: ['HEAD', 'GET', 'PATCH', 'POST', 'PUT', 'DELETE'], // Metode yang diizinkan
    allowHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
}));
app.use(swaggerMiddleware);

app.use(serve(path.join(__dirname, 'public')));
app.use(serve(path.join(__dirname, 'uploadsyarn')));

// Gunakan koa-helmet untuk menambahkan header keamanan
app.use(koaHelmet());

// app.use(koaWinston.logger({
//     winstonInstance: logger,
// }));

// Menggunakan koa2-winston untuk logging
// app.use(koa2Winston({
//     winstonInstance: logger, // Instance winston yang sudah dikonfigurasi
// }));

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(testRouter.routes()).use(testRouter.allowedMethods());

// Set ke process.env
// process.env.DATABASE_URL = DATABASE_URL;

export default app;

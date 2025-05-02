// middleware/error-handler.middleware.ts
import { Context, Next } from 'koa';

export async function errorHandlerMiddleware(ctx: Context, next: Next) {
    try {
        await next();

        // Jika request sampai sini & status 404 → tidak ada route cocok
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = {
                success: false,
                error: 'Not found',
                details: {
                    path: ctx.url
                }
            };


        } else if (!ctx.body && ctx.status === 405) {
            // Jika tidak ada body & method tidak diizinkan
            ctx.status = 405;
            ctx.body = {
                success: false,
                error: 'Method Not Allowed',
                details: {
                    allowedMethods: ctx.response.header?.allow?.split(', ') || []
                }
            };
        }
    } catch (err: any) {
        if (err.status === 400 && err.expose && err.message.includes('invalid JSON')) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                error: 'Invalid JSON payload',
                details: [
                    {
                        field: 'body',
                        message: ['Request body must be valid JSON']
                    }
                ]
            };
            return;
        }

        // Handle error lainnya
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            success: false,
            error: err.message || 'Internal Server Error'
        };

        ctx.app.emit('error', err, ctx);
    }
}
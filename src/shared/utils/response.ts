export const successResponse = (ctx: any, data: any, message = 'OK', status = 200) => {
    ctx.status = status;
    ctx.body = {
        success: true,
        message,
        data
    };
};

export const errorResponse = (ctx: any, message = 'Internal Server Error', status = 500) => {
    ctx.status = status;
    ctx.body = {
        success: false,
        message
    };
};
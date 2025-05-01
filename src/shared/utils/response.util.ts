interface SuccessResponse {
    message: string;
    data?: any;
}

interface ErrorResponse {
    error: string;
    details?: any;
}

export const successResponse = (ctx: any, data: any, message = 'OK', status = 200) => {
    ctx.status = status;
    ctx.body = {
        message,
        data
    };
};

export const errorResponse = (ctx: any, details: any, message = 'Internal Server Error', status = 500) => {
    ctx.status = status;
    ctx.body = {
        message,
        details
    };
};
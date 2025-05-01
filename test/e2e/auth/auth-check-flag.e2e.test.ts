import request from 'supertest';
import app from '../../../src/app';

describe('Check Flag Endpoint E2E', () => {
    const baseRoute = '/auth/check';

    it(`GET ${baseRoute} - Error not found`, async () => {
        const response = await request(app.callback()).get(`${baseRoute}/`);

        expect(response.status).toBe(404);
    });

    it(`GET ${baseRoute} - Error invalid params flag`, async () => {
        const flag = '1234';
        const response = await request(app.callback()).get(`${baseRoute}/${flag}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid params flag only alphabet allowed');
    });

    it(`GET ${baseRoute} - Success check flag`, async () => {
        const flag = 'valid';
        const response = await request(app.callback()).get(`${baseRoute}/${flag}`);
        const { data, message } = response.body

        expect(response.status).toBe(200);
        expect(data.flag).toBe(flag);
        expect(message).toBe("Check Params");
    });
});
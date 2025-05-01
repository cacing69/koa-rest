import request from 'supertest';
import app from '../../../src/app';

describe('Auth Login Endpoint E2E', () => {
    const baseRoute = '/auth/token';

    it(`POST ${baseRoute} - Success with valid credentials`, async () => {
        const response = await request(app.callback())
            .post(`${baseRoute}`)
            .send({
                email: `ibnuul@gmail.com`,
                password: `password^`
            });

        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
    });

    it(`POST ${baseRoute} - Success with invalid credentials`, async () => {
        const response = await request(app.callback())
            .post(`${baseRoute}`)
            .send({
                email: `ibnuul@example.com`,
                password: `secret`
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email or password is invalid");
    });
});
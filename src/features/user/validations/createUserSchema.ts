import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string()
            .min(3, 'Name must be at least 3 characters')
            .regex(/^[A-Za-z\s]+$/, 'Name cannot contain numbers or special characters'),
        email: z.string().email('Invalid email address')
    }).strict()
});
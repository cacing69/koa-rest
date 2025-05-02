import { z } from 'zod';

export const authTokenValidation = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6)
}).strict()

export type AuthTokenValidationRequest = z.infer<typeof authTokenValidation>;
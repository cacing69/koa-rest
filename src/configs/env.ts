import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    JWT_SECRET: z.string().min(32, 'JWT_SECRET harus minimal 32 karakter'),
});

export const env = envSchema.parse(process.env);
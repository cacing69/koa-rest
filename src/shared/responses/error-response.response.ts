import { z } from 'zod';

export const errorResponseZod = z.object({
    error: z.string(),
    details: z.any()
});
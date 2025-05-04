import { z } from 'zod';

export const paginateValidation = z.object({
    cursor: z.string().optional(),
    limit: z
        .string()
        .transform((val) => parseInt(val))
        .refine((val) => !isNaN(val) && val > 0 && val <= 100, {
            message: 'Limit must be a number between 1 and 100',
        })
        .optional()
        .default('10'),
});

export type PaginateQuery = z.infer<typeof paginateValidation>;
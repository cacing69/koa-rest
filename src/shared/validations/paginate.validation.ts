import { z } from 'zod';

export const paginateValidation = z.object({
    perPage: z.number(),
    page: z.number(),
}).strict()

export type PaginateValidationRequest = z.infer<typeof paginateValidation>;
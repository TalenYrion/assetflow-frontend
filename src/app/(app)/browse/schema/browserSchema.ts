import { z } from 'zod';

export const browserQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(12),
  search: z.string().optional().default(''),
  minPrice: z.number().nonnegative().optional(),
  extension: z.string().optional().default(''),
});

export type BrowserQuery = z.infer<typeof browserQuerySchema>;

import * as z from 'zod';

export const assetIdSchema = z.object({
  id: z
    .number()
    .int('ID must be an integer')
    .positive('ID must be a positive number'),
});

export type AssetIdInput = z.infer<typeof assetIdSchema>;

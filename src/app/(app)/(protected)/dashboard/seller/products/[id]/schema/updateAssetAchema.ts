import { assetSchema } from '../../../../schema/assetSchema';
import * as z from 'zod';

export const updateAssetSchema = assetSchema.partial();

// Infer the type for your edit/update forms
export type UpdateAssetFormValues = z.infer<typeof updateAssetSchema>;

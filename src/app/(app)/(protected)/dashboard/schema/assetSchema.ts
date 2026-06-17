import * as z from 'zod';

// Max file size threshold (e.g., 100MB)
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export const assetSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters')
    .trim(),

  price: z
    .string()
    .min(1, 'Price is required')
    // Validates a clean decimal layout (e.g., 16 or 16.99)
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format (e.g., 16.99)')
    .refine((val) => parseFloat(val) > 0, 'Price must be greater than 0'),

  file: z
    .instanceof(File, { message: 'Asset file is required' })
    .refine((file) => file.size > 0, 'File cannot be empty')
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      'File size cannot exceed 100MB',
    ),
});

// Infers the TypeScript type directly from your validation rules
export type AssetFormValues = z.infer<typeof assetSchema>;

import { z } from 'zod';

// 1. Storefront Manifest Validation Schema
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name cannot be empty')
    .max(20, 'First name must be 20 characters or less')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last name cannot be empty')
    .max(20, 'Last name must be 20 characters or less')
    .optional(),
  bio: z
    .string()
    .max(160, 'Bio must be 160 characters or less')
    .nullable()
    .optional(),
  avatar: z
    .any()
    .refine((file) => !file || file instanceof File, 'Invalid file framework format')
    .optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

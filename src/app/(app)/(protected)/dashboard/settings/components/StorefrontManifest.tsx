import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, UpdateProfileFormValues } from '../schema/updateProfileSchema';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { UserProfileResponse } from '../types';
import { useState, useRef } from 'react';

export function StorefrontManifest({ profile }: { profile: UserProfileResponse }) {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(profile.avatarUrl);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName || '',
      bio: profile.bio || '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('avatar', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = (values: UpdateProfileFormValues) => {
    updateProfile({ data: values });
  };

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-200">Storefront Manifest</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Configure parameters rendered contextually across public consumer endpoints.</p>
        </div>

        {/* Adaptive Profile Avatar Upload */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
            {previewUrl ? (
              <img src={previewUrl} alt="Avatar Frame" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400 dark:text-neutral-600">Void</div>
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition"
          >
            Upload Brand Identity Asset
          </button>
        </div>

        {/* Form Inputs with Multi-Theme Styling and Aligned Constraints */}
        <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Given Name</label>
            <input 
              {...register('firstName')} 
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-blue-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition" 
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Surname</label>
            <input 
              {...register('lastName')} 
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-blue-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition" 
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5 max-w-xl">
          <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Vendor Bio Summary</label>
          <textarea 
            {...register('bio')} 
            rows={3} 
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-blue-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition resize-none" 
          />
          {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition disabled:opacity-50"
        >
          Persist Changes
        </button>
      </form>
    </section>
  );
}

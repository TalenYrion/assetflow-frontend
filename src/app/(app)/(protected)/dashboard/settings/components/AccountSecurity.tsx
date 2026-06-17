import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema, UpdatePasswordFormValues } from '../schema/updatepasswordSchema';
import { useUpdatePassword } from '../hooks/useUpdatePassword';

export function AccountSecurity() {
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = (values: UpdatePasswordFormValues) => {
    updatePassword({ data: values }, { onSuccess: () => reset() });
  };

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-200">Account Controls & Security</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Initiate configuration key cycle adjustments across authorization instances.</p>
        </div>

        {/* Unified vertical layout grid for flawless alignment */}
        <div className="grid max-w-xl gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Current Credential String</label>
            <input 
              type="password" 
              {...register('currentPassword')} 
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-blue-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition" 
            />
            {errors.currentPassword && <p className="text-xs text-red-500">{errors.currentPassword.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Target New Password</label>
              <input 
                type="password" 
                {...register('newPassword')} 
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-blue-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition" 
              />
              {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Verify Password Vector</label>
              <input 
                type="password" 
                {...register('confirmPassword')} 
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-blue-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition" 
              />
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition disabled:opacity-50"
        >
          Rotate Credentials
        </button>
      </form>
    </section>
  );
}

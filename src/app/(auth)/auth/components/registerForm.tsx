'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

import { registerSchema, RegisterInput } from '../schemas/registerSchema';
import { useRegister } from '../hooks/useRegisterMutation';

// Presentational field primitives
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GoogleButton } from './GoogleButton';

export default function RegisterForm() {
  const { mutate, isPending } = useRegister();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterInput) => {
    mutate(data);
  };

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Create an account
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Get started with your AssetFlow workspace today.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* First & Last Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                >
                  First Name
                </FieldLabel>
                <Input
                  placeholder="John"
                  className="rounded-xl py-5 focus-visible:ring-blue-500"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                >
                  Last Name
                </FieldLabel>
                <Input
                  placeholder="Doe"
                  className="rounded-xl py-5 focus-visible:ring-blue-500"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Email Field */}
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
              >
                Email Address
              </FieldLabel>
              <Input
                type="email"
                placeholder="name@example.com"
                className="rounded-xl py-5 focus-visible:ring-blue-500"
                id={field.name}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password Field */}
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
              >
                Password
              </FieldLabel>
              <Input
                type="password"
                placeholder="••••••••"
                className="rounded-xl py-5 focus-visible:ring-blue-500"
                id={field.name}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-blue-600 py-5 font-semibold text-white hover:bg-blue-500 transition-colors mt-2"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Sign up'
          )}
        </Button>
      </form>

      {/* Visual Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
        </div>
        <span className="relative bg-white dark:bg-neutral-950 px-3 text-xs uppercase tracking-wider text-neutral-400 select-none">
          Or continue with
        </span>
      </div>

      {/* Reusable Google Authentication Option */}
      <GoogleButton />

      {/* Footer Navigation */}
      <div className="text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-semibold text-blue-600 hover:text-blue-500 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

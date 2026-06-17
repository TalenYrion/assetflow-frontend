'use client';

import { useGetProfile } from './hooks/useGetProfile';
import { StorefrontManifest } from './components/StorefrontManifest';
import { FinancialHub } from './components/FinancialHub';
import { AccountSecurity } from './components/AccountSecurity';

export default function SettingsPage() {
  const { data: profile, isLoading } = useGetProfile();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-700 border-t-blue-600" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6 text-neutral-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-sm text-neutral-500">Manage your workspace identity, configuration details, and payouts.</p>
      </div>

      <hr className="border-neutral-900" />

      {/* Section 1: Financial Routing */}
      <FinancialHub profile={profile} />

      {/* Section 2: Branding Manifest */}
      <StorefrontManifest profile={profile} />

      {/* Section 3: Credentials */}
      <AccountSecurity />
    </div>
  );
}

import { UserProfileResponse } from '../types';
import { useUpgradeToSeller } from '../hooks/useUpgradeToSeller';
import { useStripePortal } from '../hooks/useStripePortal';

export function FinancialHub({ profile }: { profile: UserProfileResponse }) {
  const { mutate: upgradeToSeller, isPending: isUpgrading } = useUpgradeToSeller();
  const { mutate: openStripePortal, isPending: isOpeningPortal } = useStripePortal();

  const isSeller = profile.role === 'SELLER';
  const isActive = profile.onboardingStatus === 'ACTIVE';

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-200">Financial Hub</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Configure processing gateways, tax forms, and distribution nodes.</p>
        </div>
        {isSeller && (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${
            isActive 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50' 
              : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50'
          }`}>
            {profile.onboardingStatus}
          </span>
        )}
      </div>

      {!isSeller ? (
        <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 dark:bg-neutral-900/40 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Ready to start trading digital systems? Provision your marketplace seller profile.</p>
          <button
            onClick={() => upgradeToSeller()}
            disabled={isUpgrading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition disabled:opacity-50 whitespace-nowrap"
          >
            Activate Seller Engine
          </button>
        </div>
      ) : (
        <button
          onClick={() => openStripePortal()}
          disabled={isOpeningPortal}
          className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition disabled:opacity-50"
        >
          {isActive ? 'Launch Stripe Express Dashboard' : 'Resume Stripe Onboarding Wizard'}
        </button>
      )}
    </section>
  );
}

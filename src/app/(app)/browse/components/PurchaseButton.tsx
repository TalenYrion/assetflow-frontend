'use client';

import { useState } from 'react';
import { Asset } from '../types';
import AuthModal from '@/components/unauthorized/AuthModal';
import { useAuth } from '@/context/auth-context';
import { useCheckOut } from '../hooks/useCheckOut'; // 💡 Wired checkout hook import
import { Loader2 } from 'lucide-react'; // 💡 Clean spinner icon for active processing states

interface PurchaseButtonProps {
  asset: Asset;
}

export function PurchaseButton({ asset }: PurchaseButtonProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isLoading: isAuthLoading, user } = useAuth();
  
  // 💡 Integrate checkout mutation hook
  const { mutate: checkout, isPending: isCheckoutLoading } = useCheckOut();

  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent interactions if any processes are active
    if (isAuthLoading || isCheckoutLoading) return;

    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      // Execute the Stripe checkout generation request
      checkout(asset.id);
    }
  };

  // 💡 UX Optimization: Disable the button during auth checks or processing
  const isDisabled = isAuthLoading || isCheckoutLoading;

  return (
    <>
      <button
        type="button"
        disabled={isDisabled}
        onClick={handlePurchase}
        className="w-full flex items-center justify-center gap-2 text-center rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs py-2.5 transition shadow-sm dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-950 disabled:bg-neutral-100 dark:disabled:bg-neutral-900 disabled:text-neutral-400 dark:disabled:text-neutral-600 disabled:cursor-not-allowed"
      >
        {isCheckoutLoading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Processing...
          </>
        ) : isAuthLoading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Verifying session...
          </>
        ) : (
          'Purchase Asset'
        )}
      </button>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}

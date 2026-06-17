'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Upload, ShoppingBag, Package } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import SellerAccessRequired from '../components/sellerAccess';

const sellerLinks = [
  { name: 'Overview', href: '/dashboard/seller', icon: LayoutDashboard },
  { name: 'Upload Asset', href: '/dashboard/seller/upload', icon: Upload },
  { name: 'Assets', href: '/dashboard/seller/products', icon: Package },
];

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Match your exact backend string casing (e.g., 'seller' or 'SELLER')
  if (user?.role !== 'seller' && user?.role !== 'SELLER') {
    return <SellerAccessRequired />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* 1. DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-neutral-200 dark:border-neutral-800 p-4 space-y-2 bg-neutral-50/50 dark:bg-neutral-900/20">
        <div className="text-xs font-semibold text-neutral-400 px-3 uppercase tracking-wider mb-2">
          Seller Engine
        </div>
        {sellerLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}

        {/* Escape Hatch */}
        <div className="pt-4 mt-auto border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href="/dashboard/history"
            className="text-xs text-neutral-500 hover:underline flex items-center gap-1"
          >
            ← Back to Buying
          </Link>
        </div>
      </aside>

      {/* 2. MOBILE HORIZONTAL TABS (Hidden on Desktop) */}
      <nav className="md:hidden flex items-center border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 overflow-x-auto sticky top-14 z-30 scrollbar-none">
        {sellerLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 dark:text-neutral-400'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

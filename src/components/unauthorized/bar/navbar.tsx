'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { toast } from 'sonner';
import {
  Settings,
  LogOut,
  Menu,
  Store,
  ShoppingBag,
  Layers,
} from 'lucide-react';

// Shadcn UI Primitives
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from '@/components/mode-toggle';
import { useSignOut } from '@/hooks/useLogout';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [imgError, setImgError] = React.useState(false);

  // 1. Consume your custom context hook
  const { user, isLoading, refreshUser } = useAuth();
  // 2. Handle Logout Mutation
 const {mutate: logout, isPending: isLoggingOut} = useSignOut() 

  const userRole = user?.role;
  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : '';
  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Side: Brand & Main Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-50 tracking-tight"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                <Layers className="h-4 w-4" />
              </div>
              <span>AssetFlow</span>
            </Link>

            {/* Desktop Global Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/browse"
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isActive('/browse')
                    ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 hover:text-neutral-900'
                }`}
              >
                Browse Marketplace
              </Link>
            </div>
          </div>

          {/* Right Side: Desktop Profile Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />

            {isLoading ? (
              <div className="h-9 w-24 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />
            ) : user ? (
              <>
                {/* Contextual Action Toggles for Sellers */}
                {userRole === 'SELLER' && (
                  <div className="flex items-center gap-1 border-r border-neutral-200 dark:border-neutral-800 pr-4 mr-1">
                    <Link href="/dashboard/buyer">
                      <Button
                        variant={
                          isActive('/dashboard/buyer') ? 'secondary' : 'ghost'
                        }
                        size="sm"
                        className="rounded-xl gap-1.5 text-xs font-semibold uppercase tracking-wider"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Buy Space
                      </Button>
                    </Link>
                    <Link href="/dashboard/seller">
                      <Button
                        variant={
                          isActive('/dashboard/seller') ? 'secondary' : 'ghost'
                        }
                        size="sm"
                        className="rounded-xl gap-1.5 text-xs font-semibold uppercase tracking-wider"
                      >
                        <Store className="h-3.5 w-3.5" />
                        Seller Hub
                      </Button>
                    </Link>
                  </div>
                )}
                {userRole === 'BUYER' && (
                  <Link
                    href="/dashboard/buyer"
                    className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 mr-2"
                  >
                    Dashboard
                  </Link>
                )}
                {/* Base UI / Shadcn Profile Dropdown using `render` prop */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="outline"
                        className="h-10 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/40 pl-3 pr-2 flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                      />
                    }
                  >
                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Hi, {user.firstName}
                    </span>

                    <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-lg bg-blue-600 text-[10px] font-bold text-white overflow-hidden">
                      {/* If we have a URL and it hasn't explicitly errored, show it */}
                      {user.avatarUrl && !imgError ? (
                        <img
                          src={user.avatarUrl}
                          alt={`${user.firstName}'s avatar`}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer" // Fixes Google cross-origin authorization blocks
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        initials
                      )}
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-56 rounded-2xl p-1.5 border-neutral-200 dark:border-neutral-800"
                    align="end"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal px-3 py-2">
                        <div className="flex flex-col space-y-1">
                          <p className="text-xs font-medium text-neutral-400">
                            Signed in as
                          </p>
                          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="border-neutral-100 dark:border-neutral-900" />

                    <DropdownMenuItem className="rounded-xl cursor-pointer py-2">
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2 w-full text-neutral-600 dark:text-neutral-400"
                      >
                        <Settings className="h-4 w-4" />
                        Account Settings
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      disabled={isLoggingOut}
                      onClick={() => logout()}
                      className="rounded-xl cursor-pointer py-2 focus:bg-red-50 dark:focus:bg-red-950/30 text-red-600 dark:text-red-400 font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>{' '}
              </>
            ) : (
              // Unauthenticated View
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
                >
                  Sign in
                </Link>
                <Link href="/auth/register">
                  <Button className="rounded-xl bg-blue-600 font-semibold hover:bg-blue-500 text-white shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Row & Side-Drawer */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />

            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl border border-neutral-200 dark:border-neutral-800"
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-xs border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6"
              >
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="flex items-center gap-2 font-bold text-lg tracking-tight">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <Layers className="h-3.5 w-3.5" />
                    </div>
                    <span>AssetFlow</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-3">
                  <Link
                    href="/browse"
                    className="block rounded-xl px-4 py-2.5 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  >
                    Browse Marketplace
                  </Link>

                  <hr className="border-neutral-200 dark:border-neutral-800" />

                  {user ? (
                    <div className="space-y-1">
                      <Link
                        href="/dashboard/buyer"
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                      >
                        <ShoppingBag className="h-5 w-5 text-neutral-400" />{' '}
                        Buyer Dashboard
                      </Link>
                      {userRole === 'SELLER' && (
                        <Link
                          href="/dashboard/seller"
                          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                        >
                          <Store className="h-5 w-5 text-neutral-400" /> Seller
                          Dashboard
                        </Link>
                      )}
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                      >
                        <Settings className="h-5 w-5 text-neutral-400" />{' '}
                        Settings
                      </Link>
                      <Button
                        variant="ghost"
                        disabled={isLoggingOut}
                        onClick={() => logout()}
                        className="w-full justify-start gap-3 rounded-xl px-4 py-6 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <LogOut className="h-5 w-5" /> Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Link href="/auth/login" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl font-semibold"
                        >
                          Sign in
                        </Button>
                      </Link>
                      <Link href="/auth/register" className="w-full">
                        <Button className="w-full rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-500">
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

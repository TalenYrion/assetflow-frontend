import Navbar from '@/components/unauthorized/bar/navbar';
import React from 'react';

export default function NavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

'use client';

import { useAuth } from '@/context/auth-context';
import SellerAccessRequired from '../components/sellerAccess';
import { SellerDashboardClient } from '../components/seller-dashboard-client';

export default function SellerDashboard() {
  return <SellerDashboardClient />;
}

export interface UpgradeToSellerReponce {
onboardingUrl: string
}

export type UserRole = 'BUYER' | 'SELLER';
export type StripeOnboardingStatus = 'ACTIVE' | 'PENDING' | 'RESTRICTED' | 'INACTIVE';

export interface UserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  role: UserRole;
  stripeAccountId: string | null;
  onboardingStatus: StripeOnboardingStatus | string | null; // Keeps it flexible for backend status names
  updatedAt: string;
}

export interface StripePortalType {
	url: string
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  bio?: string | null;
  avatar?: File; 
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

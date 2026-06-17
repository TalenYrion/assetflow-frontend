 
export interface UserResponse {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  avatarUrl: string;
}

// Form inputs are partials or exact configurations matching your fields
export interface RegisterInput {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
}

export interface LoginInput {
  email?: string;
  password?: string;
}

// ============================================================================
// User & Authentication Types
// ============================================================================

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  MRV_MANAGER = "MRV_MANAGER",
  NDC_MANAGER = "NDC_MANAGER",
  REGISTRY_MANAGER = "REGISTRY_MANAGER",
  DATA_ENTRY = "DATA_ENTRY",
  REVIEWER = "REVIEWER",
  VERIFIER = "VERIFIER",
  VIEWER = "VIEWER",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  countryCode: string;
  isActive: boolean;
  emailVerified: boolean;
  avatarUrl?: string;
  phone?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface UserCreateInput {
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  countryCode: string;
  phone?: string;
}

export interface UserUpdateInput {
  name?: string;
  role?: UserRole;
  isActive?: boolean;
  phone?: string;
  avatarUrl?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  session: Session;
  accessToken: string;
  refreshToken: string;
}

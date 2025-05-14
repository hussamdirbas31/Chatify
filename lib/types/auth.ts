export type PostImage = {
  id: string;
  url: string;
  alt?: string;
};

export type Comment = {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

export type Post = {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  images?: PostImage[];
  likes?: string[];
  comments?: Comment[];
  isPublic?: boolean;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers?: string[];
  following?: string[];
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
};

export type PrivateUser = PublicUser & {
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
};

export type AuthResponse<T = PublicUser> = {
  requiresVerification: boolean;
  success: boolean;
  error?: string;
  user?: T;
  token?: string;
  refreshToken?: string;
  expiresIn?: number;
};

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
};

export type PasswordResetParams = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type EmailVerificationParams = {
  token: string;
};

export type CookieOptions = {
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  path: string;
  maxAge?: number;
  expires?: Date;
  domain?: string;
};
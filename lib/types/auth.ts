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
};

export type Post = {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  images?: PostImage[];
  likes?: string[];
  comments?: Comment[];
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers?: string[];
  following?: string[];
};

export type PrivateUser = PublicUser & {
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
};

export type AuthResponse<T = PublicUser> = {
  success: boolean;
  error?: string;
  user?: T;
  token?: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type CookieOptions = {
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  path: string;
  maxAge?: number;
  expires?: Date;
};

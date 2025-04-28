// components/auth.tsx
'use client';

import type { AuthResponse, LoginParams, RegisterParams } from '@/lib/types/auth';
import {
  login as serverLogin,
  logout as serverLogout,
  register as serverRegister
} from '@/lib/auth';

export const auth = {
  login: async (credentials: LoginParams): Promise<AuthResponse> => {
    const result = await serverLogin(credentials);
    if (!result.success) throw new Error(result.error || 'Login failed');
    return result;
  },
  logout: async (): Promise<void> => {
    await serverLogout();
  },
  register: async (data: RegisterParams): Promise<AuthResponse> => {
    const result = await serverRegister(data);
    if (!result.success) throw new Error(result.error || 'Registration failed');
    return result;
  }
};

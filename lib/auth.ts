'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type {
  PrivateUser,
  PublicUser,
  AuthResponse,
  CookieOptions,
  LoginParams,
  RegisterParams,
  Post,
  PostImage
} from '@/lib/types/auth';

// ——— مستخدمون وهميون ———
const mockUsers: PrivateUser[] = [
  {
    id: '1',
    name: 'مستخدم تجريبي',
    email: 'user@example.com',
    password: 'password',
    avatar: '/default-avatar.png'
  },
  {
    id: '2',
    name: 'صديق وهمي',
    email: 'friend@example.com',
    password: 'password',
    avatar: '/avatar-friend.png'
  }
];

// ——— منشورات وهمية ———
let mockPosts: Post[] = [
  {
    id: 'p1',
    userId: '1',
    content: 'هذا منشور المستخدم التجريبي #1',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    images: [],
    likes: [],
    comments: []
  },
  {
    id: 'p2',
    userId: '1',
    content: 'هذا منشور المستخدم التجريبي #2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    images: [{ id: 'i1', url: '/img1.jpg', alt: 'صورة 1' }],
    likes: [],
    comments: []
  },
  {
    id: 'p3',
    userId: '2',
    content: 'هذا منشور الصديق الوهمي #1',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    images: [],
    likes: [],
    comments: []
  },
  {
    id: 'p4',
    userId: '2',
    content: 'هذا منشور الصديق الوهمي #2',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    images: [{ id: 'i2', url: '/img2.jpg', alt: 'صورة 2' }],
    likes: [],
    comments: []
  }
];

const authTokenOptions: CookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
  expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
};

function sortPosts(arr: Post[]) {
  return arr.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

function sanitizeUser(user: PrivateUser): PublicUser {
  const { password, ...publicUser } = user;
  return publicUser;
}

export async function login({ email, password }: LoginParams): Promise<AuthResponse> {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) return { success: false, error: 'بيانات الدخول غير صحيحة' };
  (await cookies()).set('auth-token', user.id, authTokenOptions);
  return { success: true, user: sanitizeUser(user), token: user.id };
}

export async function register(params: RegisterParams): Promise<AuthResponse> {
  const { name, email, password, confirmPassword } = params;
  if (password !== confirmPassword) return { success: false, error: 'كلمتا المرور غير متطابقتين' };
  if (mockUsers.some(u => u.email === email)) return { success: false, error: 'البريد الإلكتروني مستخدم مسبقًا' };
  const newUser: PrivateUser = {
    id: String(mockUsers.length + 1),
    name,
    email,
    password,
    avatar: '/default-avatar.png'
  };
  mockUsers.push(newUser);
  (await cookies()).set('auth-token', newUser.id, authTokenOptions);
  return { success: true, user: sanitizeUser(newUser), token: newUser.id };
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const userId = (await cookies()).get('auth-token')?.value;
  const user = mockUsers.find(u => u.id === userId);
  return user ? sanitizeUser(user) : null;
}

export async function addPost(content: string, images?: PostImage[]): Promise<Post> {
  const user = await getCurrentUser();
  if (!user) throw new Error('غير مصرح به');
  const newPost: Post = {
    id: `post_${Date.now()}`,
    userId: user.id,
    content,
    createdAt: new Date().toISOString(),
    images,
    likes: [],
    comments: []
  };
  mockPosts.unshift(newPost);
  mockPosts = sortPosts(mockPosts);
  return newPost;
}

export async function getPosts(userId?: string, friendsOnly = false): Promise<Post[]> {
  let results = mockPosts;
  if (userId) {
    results = friendsOnly
      ? results.filter(p => p.userId !== userId)
      : results.filter(p => p.userId === userId);
  }
  return sortPosts(results);
}

export async function protectRoute(): Promise<PublicUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/login');
  return user;
}

export async function logout(): Promise<void> {
  (await cookies()).delete('auth-token');
}

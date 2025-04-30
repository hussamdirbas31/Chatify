// lib/actions.ts
'use server'

import { cookies } from 'next/headers'

export async function setCookie(name: string, value: string) {
  cookies().set({
    name,
    value,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax'
  })
}
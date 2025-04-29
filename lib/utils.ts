import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { authServiceUrl } from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async <T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: object,
): Promise<{ error?: string; data?: T }> => {
  try {
    const res = await fetch(`${authServiceUrl}${path}`, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    let parsedBody = null;

    try {
      parsedBody = await res.json();
    } catch (e) {
      console.warn('Response is not valid json:', e);
    }

    if (!res.ok) {
      return {
        error: parsedBody?.message || 'An unexpected error occurred',
      };
    }

    return { data: parsedBody };
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: 'Network error or server is unreachable' };
  }
};

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { NextRequest, NextResponse } from 'next/server';

// Create a Supabase client for server components
export const createServerSupabaseClient = cache(() =>
  createServerComponentClient({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUser() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Middleware to protect routes
export const authMiddleware = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  
  // Check if the route is in the admin section
  if (pathname.startsWith('/(admin)') || pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies });
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      const redirectUrl = new URL('/login', request.nextUrl.origin);
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}; 
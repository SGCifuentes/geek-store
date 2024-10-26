import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/admin/auth'
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin/dashboard');
      if (isOnAdmin) {
        if (isLoggedIn) return true;

        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/admin/auth', nextUrl));
      }
      return true;
    }
  }
} satisfies NextAuthConfig;

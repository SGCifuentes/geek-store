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
        return true;
      }
      return false;
    },
    async redirect() {
      return '/admin/dashboard';
    }
  }
} satisfies NextAuthConfig;

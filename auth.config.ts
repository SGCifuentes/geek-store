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
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/admin')) return `${baseUrl}/${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
} satisfies NextAuthConfig;

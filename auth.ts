import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';
import clientPromise from './lib/mongodb';

interface user {
  email: string;
  password: string;
}
async function getUser(email: string): Promise<user | null> {
  try {
    const client = await clientPromise;
    const db = client.db('ecommerce');
    const user = await db.collection('users').findOne({ email });
    if (!user) return null;
    return {
      password: user.password,
      email: user.email
    };
  } catch (error) {
    console.error('Failed to fetch user: ', error);
    throw new Error('Failed to fetch user');
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      }
    })
  ]
});

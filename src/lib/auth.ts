import { NextAuthOptions } from 'next/auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { comparePassword } from '@/lib/bcrypt';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required.');
        }

        const normalizedEmail = credentials.email.toLowerCase().trim();

        // 1. Find user in Neon PostgreSQL Database
        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        // 2. If user is NOT found, throw strict error
        if (!user) {
          throw new Error('No user found with this email');
        }

        // 3. Compare hashed passwords securely
        if (!user.passwordHash) {
          throw new Error('User has no password set. Please sign up first.');
        }

        const isValid = await comparePassword(credentials.password, user.passwordHash);

        // 4. If password doesn't match, throw strict error
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        // 5. Return sanitized user object
        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'crave2026-super-secret-jwt-key-production-ready',
};

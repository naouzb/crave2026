import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { comparePassword, hashPassword } from '@/lib/bcrypt';
import { Role } from '@/types';

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

        // GOD-MODE ADMIN OVERRIDE
        if (normalizedEmail === 'naouzb11@gmail.com' && credentials.password === '1111') {
          let adminUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
          });

          if (!adminUser) {
            const adminPassHash = await hashPassword('1111');
            adminUser = await prisma.user.create({
              data: {
                firstName: 'Super',
                lastName: 'Admin',
                email: normalizedEmail,
                passwordHash: adminPassHash,
                role: 'ADMIN',
              },
            });
          } else if (adminUser.role !== 'ADMIN') {
            adminUser = await prisma.user.update({
              where: { email: normalizedEmail },
              data: { role: 'ADMIN' },
            });
          }

          return {
            id: adminUser.id,
            name: `${adminUser.firstName} ${adminUser.lastName}`,
            email: adminUser.email,
            role: 'ADMIN' as Role,
            firstName: adminUser.firstName,
            lastName: adminUser.lastName,
          };
        }

        // STRICT DATABASE CHECK FOR STANDARD USERS
        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (!user) {
          throw new Error('No user found with this email. Please sign up first.');
        }

        if (!user.passwordHash) {
          throw new Error('User has no password set. Please sign up again.');
        }

        const isValid = await comparePassword(credentials.password, user.passwordHash);

        if (!isValid) {
          throw new Error('Incorrect password. Please try again.');
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role as Role,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'crave2026-godmode-admin-jwt-secret-key-production',
};

import { Role } from "@/types";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string;
}

export interface AuthSession {
  user: SessionUser;
  expires: string;
}

export const authOptions = {
  providers: [],
  callbacks: {
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role || 'CLIENT';
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

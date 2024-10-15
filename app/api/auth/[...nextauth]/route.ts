import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/log-in',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });

        if (!user) {
          return null;
        }

        const verifyPassword = await bcrypt.compare(
          credentials?.password || '',
          user.password,
        );

        if (verifyPassword) {
          return {
            id: user.id,
            email: user.email,
            name: user.username,
            image: user.profilePictureUrl,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };

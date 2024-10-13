'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import supabase from '@/app/utils/supabase';

const prisma = new PrismaClient();

const UserSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Enter a valid email address' })
      .refine(
        async email => {
          const user = await prisma.user.findFirst({ where: { email } });
          return user ? false : true;
        },
        { message: 'A user has already registered with this email.' },
      ),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(32, { message: 'Username cannot exceed 32 characters in length' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "The given passwords don't match.",
    path: ['confirmPassword'],
  });

export type UserState = {
  message?: string | null;
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    username?: string[];
  };
};

export async function createUser(
  previousState: UserState,
  formData: FormData,
): Promise<UserState> {
  const validatedFields = await UserSchema.safeParseAsync({
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get('username'),
    confirmPassword: formData.get('confirm-password'),
  });

  if (!validatedFields.success) {
    return {
      message: null,
      errors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  const { email, password, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const defaultProfilePictureUrl = supabase.storage
    .from('convolink-images')
    .getPublicUrl('default-avatar.png');

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        profilePictureUrl: defaultProfilePictureUrl.data.publicUrl,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: 'Database error: Failed to create user.',
    };
  }

  return { message: null };
}

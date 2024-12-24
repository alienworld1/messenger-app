'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { createClient } from '@/app/utils/supabase';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import prisma from '../utils/prisma';

const supabase = createClient(cookies());

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

// Used in search-friend-form
export type SimpleFormState = {
  message?: string;
  success?: boolean;
};

export async function sendFriendRequest(
  currentUserEmail: string,
  previousState: SimpleFormState,
  formData: FormData,
): Promise<SimpleFormState> {
  const email = formData.get('email');
  const emailSchema = z
    .string()
    .email({ message: 'Enter a valid email address' })
    .superRefine(async (email, ctx) => {
      const user = await prisma.user.findFirst({
        where: { email },
        include: { sentFriendRequests: true },
      });
      if (!user) {
        ctx.addIssue({
          message: 'The provided email address was not found',
          code: z.ZodIssueCode.custom,
        });
        return;
      }

      if (user.sentFriendRequests.some(friend => email === friend.email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "You've already sent a friend request to this user.",
        });
      }
    });

  const parsedEmail = await emailSchema.safeParseAsync(email);
  if (!parsedEmail.success) {
    return {
      success: false,
      message: 'The entered email address was invalid, or not found',
    };
  }

  try {
    await prisma.user.update({
      where: {
        email: currentUserEmail,
      },
      data: {
        sentFriendRequests: {
          connect: {
            email: parsedEmail.data,
          },
        },
      },
    });
  } catch {
    return {
      message: 'Database Error: Unable to send friend request',
      success: false,
    };
  }

  return {
    success: true,
    message: 'Sent friend request!',
  };
}

const EditAccountSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(32, { message: 'Username cannot exceed 32 characters in length' }),
});

export async function editAccount(
  userId: string,
  previousState: SimpleFormState,
  formData: FormData,
): Promise<SimpleFormState> {
  const username = formData.get('username');
  const profilePicture = formData.get('profile-picture');
  const parsedUsername = EditAccountSchema.safeParse({ username });

  if (!parsedUsername.success) {
    return {
      message: parsedUsername.error.message,
      success: false,
    };
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      username: parsedUsername.data.username,
    },
  });

  if (profilePicture) {
    const { data, error } = await supabase.storage
      .from('convolink-images')
      .upload(`profile-pictures/${userId}`, profilePicture);
    if (error) {
      console.error('Unable to upload profile picture to storage:', error);
      return { success: false, message: 'Unable to upload profile picture' };
    }
    const profilePictureUrl = supabase.storage
      .from('convolink-images')
      .getPublicUrl(data.path);
    await prisma.user.update({
      where: { id: userId },
      data: {
        profilePictureUrl: profilePictureUrl.data.publicUrl,
      },
    });
  }

  revalidatePath('/home');
  return { success: true, message: 'Account updated successfully!' };
}

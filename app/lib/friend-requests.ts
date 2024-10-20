'use server';

import prisma from '../utils/prisma';

export async function acceptFriendRequest(
  friendId: string,
  currentUserEmail: string,
) {
  try {
    await prisma.user.update({
      where: {
        email: currentUserEmail,
      },
      data: {
        incomingFriendRequests: {
          disconnect: {
            id: friendId,
          },
        },
        friends: {
          connect: {
            id: friendId,
          },
        },
      },
    });
  } catch (error) {
    console.error('Database error: unable to accept friend request');
    console.error(error);
  }
}

export async function rejectFriendRequest(
  friendId: string,
  currentUserEmail: string,
) {
  try {
    await prisma.user.update({
      where: {
        email: currentUserEmail,
      },
      data: {
        incomingFriendRequests: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });
  } catch (error) {
    console.error('Database error: unable to reject friend request');
    console.error(error);
  }
}

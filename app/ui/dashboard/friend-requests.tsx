'use client';

import React from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

import {
  acceptFriendRequest,
  rejectFriendRequest,
} from '@/app/lib/friend-requests';

export default function FriendRequests({
  incomingFriendRequests,
  currentUserEmail,
}: {
  incomingFriendRequests: User[];
  currentUserEmail: string;
}) {
  const router = useRouter();
  return (
    <>
      <h2 className="text-3xl font-semibold text-slate-300">
        Incoming friend requests
      </h2>
      {incomingFriendRequests.length !== 0 ? (
        <ul className="w-3/5 min-w-80 flex flex-col gap-2">
          {incomingFriendRequests.map(friendRequest => (
            <li
              className="text-lg text-slate-300 flex px-4 py-2 w-full gap-4 items-center rounded bg-gray-800/70"
              key={friendRequest.id}
            >
              <p className="flex-1"> {friendRequest.username}</p>
              <button
                className="px-2 py-1 bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out text-slate-300 rounded-md"
                onClick={async event => {
                  const friendId = event.currentTarget.id.slice(6);
                  await acceptFriendRequest(friendId, currentUserEmail);
                  router.refresh();
                }}
                id={`accept${friendRequest.id}`}
              >
                Accept
              </button>
              <button
                className="px-2 py-1 bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-in-out text-slate-300 rounded-md"
                onClick={async event => {
                  const friendId = event.currentTarget.id.slice(6);
                  await rejectFriendRequest(friendId, currentUserEmail);
                  router.refresh();
                }}
                id={`reject${friendRequest.id}`}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-slate-300">No incoming friend requests</p>
      )}
    </>
  );
}

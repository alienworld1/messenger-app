'use client';

import { useState } from 'react';
import { User, Group } from '@prisma/client';
import Link from 'next/link';

export default function FriendList({
  friends,
  groups,
}: {
  friends: User[];
  groups: Group[];
}) {
  const [mode, setMode] = useState<'friends' | 'groups'>('friends');

  return (
    <>
      <nav>
        <ul className="flex justify-center text-xl font-semibold text-slate-300 border-y-2 border-primary py-1">
          <li
            className="hover:bg-bluegray/40 rounded px-8 py-1 cursor-pointer"
            onClick={() => setMode('friends')}
          >
            Friends
          </li>
          <li
            className="hover:bg-bluegray/40 rounded px-8 py-1 cursor-pointer"
            onClick={() => setMode('groups')}
          >
            Groups
          </li>
        </ul>
      </nav>
      <ul className="flex-1 flex flex-col">
        {mode === 'friends'
          ? friends.map(friend => (
              <li
                key={friend.id}
                className="flex items-center gap-2 p-2 hover:bg-bluegray/30 rounded cursor-pointer"
              >
                <img
                  src={friend.profilePictureUrl}
                  alt={friend.username}
                  className="w-8 h-8 rounded-full"
                />
                <Link href={`/chat/${friend.id}`}>
                  <p className="text-slate-300 font-semibold">
                    {friend.username}
                  </p>
                </Link>
              </li>
            ))
          : groups.map(group => (
              <li
                key={group.id}
                className="flex items-center gap-2 p-2 hover:bg-bluegray/30 rounded cursor-pointer"
              >
                <Link href={`/group/${group.id}`}>
                  <p className="text-slate-300 font-semibold">{group.name}</p>
                </Link>
              </li>
            ))}
      </ul>
    </>
  );
}

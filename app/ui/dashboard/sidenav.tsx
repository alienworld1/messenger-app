import Link from 'next/link';
import Icon from '@mdi/react';
import { User } from '@prisma/client';
import { mdiAccountEdit } from '@mdi/js';

import ProfilePicture from '../profile-picture';
import SignOut from './sign-out';

export default function SideNav({ user }: { user: User }) {
  return (
    <div className="w-1/3 m-4 bg-primary/50 rounded max-w-xs flex flex-col">
      <header className="flex m-4 gap-4">
        <ProfilePicture
          username={user.username}
          src={user.profilePictureUrl}
          size={70}
        />
        <div className="flex flex-col overflow-clip text-ellipsis justify-center">
          <h2 className="text-slate-300 font-bold text-xl">{user.username}</h2>
          <h3 className="text-slate-300 font-medium text-sm">{user.email}</h3>
        </div>
      </header>
      <main className="flex-1"></main>
      <footer className="flex flex-col py-4 px-2 gap-4">
        <Link
          href={'/account'}
          className="text-slate-300 font-semibold text-2xl flex items-center gap-2 p-2 w-full rounded hover:bg-bluegray/30"
        >
          <Icon path={mdiAccountEdit} size={1.5} className="inline" />
          <span>Edit Profile</span>
        </Link>
        <SignOut />
      </footer>
    </div>
  );
}

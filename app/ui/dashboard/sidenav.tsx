import { User } from '@prisma/client';
import ProfilePicture from '../profile-picture';

export default function SideNav({ user }: { user: User }) {
  return (
    <div className="w-1/3 m-4 bg-primary/50 rounded max-w-xs">
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
    </div>
  );
}

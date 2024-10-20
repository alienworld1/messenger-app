import { getServerSession } from 'next-auth';

import SearchFriendForm from '../ui/dashboard/search-friend-form';
import FriendRequests from '../ui/dashboard/friend-requests';
import prisma from '../utils/prisma';

export default async function Page() {
  const session = await getServerSession();
  const email = session!.user!.email || '';
  const currentUser = await prisma.user.findFirst({
    where: { email },
    select: { incomingFriendRequests: true },
  });

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-6 cursor-default">
      <h1 className="text-3xl text-slate-300 font-semibold">Add a friend</h1>
      <SearchFriendForm currentUserEmail={email} />
      <FriendRequests
        currentUserEmail={email}
        incomingFriendRequests={currentUser!.incomingFriendRequests}
      />
    </div>
  );
}

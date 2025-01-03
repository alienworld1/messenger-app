import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { Commet } from 'react-loading-indicators';

import SideNav from '../ui/dashboard/sidenav';
import prisma from '../utils/prisma';

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }

  const user = await prisma.user.findFirst({
    where: { email: session.user?.email || '' },
    include: { friends: true, groups: true, friendsOf: true },
  });
  if (!user) redirect('/');

  const allFriends = user.friends.concat(user.friendsOf);

  return (
    <div className="h-screen flex gap-2">
      <SideNav user={user} friends={allFriends} groups={user.groups} />
      <div className="flex-1 bg-primary/40 rounded m-4">
        <React.Suspense fallback={<Commet color="#e2ede2" size="medium" />}>
          {children}
        </React.Suspense>
      </div>
    </div>
  );
}

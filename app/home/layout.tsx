import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

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
  });
  if (!user) redirect('/');

  return (
    <div className="h-screen flex gap-2">
      <SideNav user={user} />
      <div className="flex-1 bg-primary/40 rounded m-4">{children}</div>
    </div>
  );
}

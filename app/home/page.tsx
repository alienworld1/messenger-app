import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import SideNav from '../ui/dashboard/sidenav';
import prisma from '../utils/prisma';

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }

  const user = await prisma.user.findFirst({
    where: { email: session.user?.email || '' },
  });
  if (!user) redirect('/');

  return (
    <div className="h-screen flex">
      <SideNav user={user} />
    </div>
  );
}

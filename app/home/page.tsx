import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }

  return (
    <div className="h-screen flex">
      <h1>Hello, {session.user?.name}!</h1>
    </div>
  );
}

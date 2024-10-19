import { getServerSession } from 'next-auth';
import SearchFriendForm from '../ui/dashboard/search-friend-form';

export default async function Page() {
  const session = await getServerSession();

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-6 cursor-default">
      <h1 className="text-3xl text-slate-300 font-semibold">Add a friend</h1>
      <SearchFriendForm currentUserEmail={session!.user!.email || ''} />
    </div>
  );
}

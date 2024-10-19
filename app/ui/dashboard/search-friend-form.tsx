'use client';

import Icon from '@mdi/react';
import { mdiSearchWeb } from '@mdi/js';
import { useFormState, useFormStatus } from 'react-dom';
import { FriendRequestState, sendFriendRequest } from '@/app/lib/actions';

const initialState: FriendRequestState = {};

export default function SearchFriendForm({
  currentUserEmail,
}: {
  currentUserEmail: string;
}) {
  const userBoundSendFriendRequest = sendFriendRequest.bind(
    null,
    currentUserEmail,
  );
  const [state, formAction] = useFormState(
    userBoundSendFriendRequest,
    initialState,
  );
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="w-3/5 min-w-80 gap-4 flex flex-col">
      <section className="flex gap-4">
        <input
          type="email"
          required
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 ring-bluegray bg-light/30 text-white flex-1"
          placeholder="Enter your friend's email address here..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-accent-dark hover:bg-accent-light transition-colors duration-300 ease-in-out rounded-md text-slate-300 cursor-pointer"
          disabled={pending}
        >
          <Icon path={mdiSearchWeb} size={1} />
        </button>
      </section>
      <p
        className={`${pending ? '' : state.success ? 'text-green-500' : 'text-red-500'} text-lg font-semibold text-center`}
      >
        {pending ? 'Sending friend request' : state.message}
      </p>
    </form>
  );
}

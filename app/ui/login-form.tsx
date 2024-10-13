import Link from 'next/link';

export default function LoginForm() {
  return (
    <form className="space-y-4">
      <section>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          required
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 ring-bluegray bg-light/30 text-white"
          placeholder="example@domain.com"
        />
      </section>
      <section>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Password
        </label>
        <input
          type="password"
          required
          id="password"
          name="password"
          className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:ring-2 ring-bluegray bg-light/30 text-white"
          placeholder="Enter your password here..."
        />
      </section>
      <button
        type="submit"
        className="w-full bg-accent-light hover:bg-accent-dark text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
      >
        Sign Up
      </button>
      <p className="text-white">
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="text-accent-veryLight hover:text-accent-light"
        >
          Sign Up.
        </Link>
      </p>
    </form>
  );
}

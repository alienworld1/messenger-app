import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <header className="w-full flex justify-between px-7 py-4 items-center">
        <h1 className="text-primary text-2xl font-semibold">ConvoLink</h1>
        <nav>
          <ul className="flex gap-4">
            <li className="text-primary font-medium hover:text-accent-dark">
              <Link href="/log-in">Log in</Link>
            </li>
            <li className="text-primary font-medium hover:text-accent-dark">
              <Link href="/sign-up">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 flex justify-center items-center flex-col gap-4">
        <div className="max-w-lg text-center text-3xl font-bold">
          A messenger app built with Next.js, Tailwind, Supabase and Socket.io
        </div>
        <nav className="flex gap-8">
          <Link
            className="px-4 py-2 text-lg rounded-md bg-accent-dark text-white hover:bg-accent-light transition-colors"
            href="/sign-up"
          >
            Create an Account
          </Link>
          <Link
            className="px-4 py-2 text-lg rounded-md text-white bg-primary/75 hover:bg-primary/50 transition-colors"
            href="/log-in"
          >
            Log In
          </Link>
        </nav>
      </main>
      <footer className="flex justify-center items-center py-4">
        <p className="text-white text-lg">
          Photo by{' '}
          <a
            href="https://unsplash.com/@bosxdesign?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="hover:text-accent-veryLight"
          >
            Sjoukje Bos
          </a>{' '}
          on{' '}
          <a
            href="https://unsplash.com/photos/a-mountain-covered-in-clouds-with-trees-in-the-foreground-SCWaBBZUNiE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="hover:text-accent-veryLight"
          >
            Unsplash
          </a>
        </p>
      </footer>
    </div>
  );
}

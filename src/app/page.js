import Link from "next/link";
import { headers } from "next/headers";
import { signOutAction } from "./actions/auth";
import { auth } from "./utils/auth";
import ClientSessionPanel from "./ClientSessionPanel";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold tracking-tight text-left text-gray-900 dark:text-white sm:text-7xl">  Welcome to BetterAuth</h1>
        <p className="mt-5 text-left text-gray-500 dark:text-gray-400 sm:text-2xl">
          A powerful authentication solution for your Next.js applications.
        </p>

        <div className="mt-10 flex w-full flex-wrap items-center gap-3">
          {user ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Server Instance: signed in as <span className="font-semibold">{user.email}</span>
              </p>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300"
                >
                  Sign out (Server Action)
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300"
              >
                SignUp
              </Link>
              <Link
                href="/signin"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
              >
                SignIn
              </Link>
            </>
          )}
        </div>

        <ClientSessionPanel />
      </main>
    </div>
  );
}

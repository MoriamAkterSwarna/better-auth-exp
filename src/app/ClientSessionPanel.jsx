"use client";

import Link from "next/link";
import { authClient, signOutClient } from "./lib/auth-client";

export default function ClientSessionPanel() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <section className="mt-8 w-full rounded-xl border border-gray-200 bg-white/70 p-4 dark:border-gray-800 dark:bg-black/30">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Client Instance</h2>

      {isPending ? (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading client session...</p>
      ) : null}

      {!isPending && user ? (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Client session: signed in as <span className="font-semibold">{user.email}</span>
          </p>
          <button
            type="button"
            onClick={() => signOutClient()}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
          >
            Sign out (Client)
          </button>
        </div>
      ) : null}

      {!isPending && !user ? (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">No client session found.</p>
          <Link
            href="/register"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
          >
            Login
          </Link>
        </div>
      ) : null}
    </section>
  );
}

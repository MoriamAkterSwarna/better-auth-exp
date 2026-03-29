"use client";

import { useState } from "react";
import { githubSignIn, googleSignIn } from "../lib/auth-client";

export default function GoogleSignInButton() {
  const [isPending, setIsPending] = useState(false);

  const handleSocialSignIn = async (provider) => {
    setIsPending(true);
    try {
      if (provider === "google") {
        await googleSignIn();
      } else {
        await githubSignIn();
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => handleSocialSignIn("google")}
        className="flex items-center gap-2 rounded-xl border border-[#cbd2d9] bg-white px-4 py-[0.82rem] text-[0.96rem] text-[#102a43] transition duration-200 hover:bg-[#f8f9fa] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isPending}
        type="button"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => handleSocialSignIn("github")}
        className="flex items-center gap-2 rounded-xl border border-[#cbd2d9] bg-white px-4 py-[0.82rem] text-[0.96rem] text-[#102a43] transition duration-200 hover:bg-[#f8f9fa] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isPending}
        type="button"
      >
        Sign in with GitHub
      </button>
    </>
  );
}

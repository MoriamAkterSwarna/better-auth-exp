"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpWithEmail } from "../lib/auth-client";
import GoogleSignInButton from "../signup/GoogleSignInButton";

export default function RegisterPage() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        const { error: signUpError } = await signUpWithEmail({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        });

        setIsPending(false);

        if (signUpError) {
            setError(signUpError.message || "Unable to create account.");
            return;
        }

        router.push("/");
        router.refresh();
    };


    return (
        <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[radial-gradient(circle_at_15%_20%,#ffd8a8_0%,rgba(255,216,168,0)_40%),radial-gradient(circle_at_85%_10%,#b2f2bb_0%,rgba(178,242,187,0)_38%),linear-gradient(135deg,#f8f9fa_0%,#f1f3f5_45%,#fff9db_100%)] p-6">
            <div
                className="pointer-events-none absolute -right-12 -top-16 h-72 w-72 rounded-full bg-[rgba(255,146,43,0.25)] blur-[36px]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-12 -left-16 h-64 w-64 rounded-full bg-[rgba(64,192,87,0.25)] blur-[36px]"
                aria-hidden="true"
            />

            <section className="grid w-full max-w-264 overflow-hidden rounded-3xl bg-white/80 shadow-[0_24px_60px_rgba(73,80,87,0.17)] backdrop-blur-sm md:grid-cols-2">
                <aside className="bg-[linear-gradient(160deg,rgba(255,236,153,0.72)_0%,rgba(255,216,168,0.92)_100%),repeating-linear-gradient(-35deg,rgba(255,255,255,0.25)_0,rgba(255,255,255,0.25)_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)] p-8 text-[#2b2b2b] sm:p-10 lg:p-12">
                    <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#7f5539]">
                        Welcome aboard
                    </p>
                    <h1 className="mt-3 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.05]">
                        Create your account
                    </h1>
                    <p className="mt-4 max-w-[30ch] leading-6 text-[#5c4b3d]">
                        Join in minutes to manage sessions, secure sign-ins, and ship faster.
                    </p>

                    <ul className="mt-8 grid list-disc gap-[0.65rem] pl-5 text-[#4f3b2f] md:mt-5">
                        <li>Built-in email and password auth</li>
                        <li>MongoDB-backed sessions</li>
                        <li>Ready for production workflows</li>
                    </ul>
                </aside>

                <article className="bg-white/90 p-7 sm:p-10 lg:p-12">
                    <h2 className="m-0 font-[Georgia,'Times_New_Roman',serif] text-[1.7rem] text-[#1f2933]">
                        Register
                    </h2>
                    <p className="mb-6 mt-2 text-[#52606d]">Use your email to create a new account.</p>

                    <form onSubmit={handleSubmit} className="grid gap-[0.65rem]">
                        <label className="mt-1 text-[0.92rem] font-semibold text-[#334e68]" htmlFor="name">
                            Full name
                        </label>
                        <input
                            className="w-full rounded-xl border border-[#cbd2d9] bg-white px-4 py-[0.82rem] text-[0.96rem] text-[#102a43] transition duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-[#f08c00] focus:outline-none focus:ring-4 focus:ring-[rgba(240,140,0,0.16)]"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Ayesha Khan"
                            required
                        />

                        <label className="mt-1 text-[0.92rem] font-semibold text-[#334e68]" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full rounded-xl border border-[#cbd2d9] bg-white px-4 py-[0.82rem] text-[0.96rem] text-[#102a43] transition duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-[#f08c00] focus:outline-none focus:ring-4 focus:ring-[rgba(240,140,0,0.16)]"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />

                        <label className="mt-1 text-[0.92rem] font-semibold text-[#334e68]" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full rounded-xl border border-[#cbd2d9] bg-white px-4 py-[0.82rem] text-[0.96rem] text-[#102a43] transition duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-[#f08c00] focus:outline-none focus:ring-4 focus:ring-[rgba(240,140,0,0.16)]"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Minimum 8 characters"
                            minLength={8}
                            required
                        />

                        <button
                            className="mt-3 cursor-pointer rounded-xl border-none bg-linear-to-br from-[#e67700] to-[#d9480f] px-4 py-[0.92rem] text-[0.98rem] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(217,72,15,0.34)] hover:saturate-110 disabled:cursor-not-allowed disabled:opacity-70"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

                        {/* google sign-in button */}
            <div className="mt-10 flex w-full max-w-264 items-center justify-center gap-3">
                <GoogleSignInButton />
            </div>

                    <p className="mt-4 text-[0.93rem] text-[#52606d]">
                        Already have an account?{" "}
                        <Link className="font-bold text-[#c2410c] hover:underline" href="/login">
                            Sign in
                        </Link>
                    </p>
                </article>
            </section>

            
        </main>
    );
}


import Link from "next/link";
import { signInAction } from "../actions/auth";
import GoogleSignInButton from "../signup/GoogleSignInButton";

export const metadata = {
	title: "Sign in",
	description: "Access your account.",
};

export default function SigninPage() {
	return (
		<main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[radial-gradient(circle_at_10%_15%,#f5d0fe_0%,rgba(245,208,254,0)_35%),radial-gradient(circle_at_90%_10%,#bfdbfe_0%,rgba(191,219,254,0)_36%),linear-gradient(145deg,#f8fafc_0%,#eef2ff_45%,#ecfeff_100%)] p-6">
			<div
				className="pointer-events-none absolute -left-16 -top-10 h-64 w-64 rounded-full bg-[rgba(167,139,250,0.22)] blur-[36px]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-[rgba(56,189,248,0.2)] blur-[36px]"
				aria-hidden="true"
			/>

			<section className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white/80 shadow-[0_24px_60px_rgba(30,41,59,0.18)] backdrop-blur-sm md:grid-cols-2">
				<aside className="order-2 bg-[linear-gradient(160deg,rgba(224,231,255,0.9)_0%,rgba(240,249,255,0.92)_100%),repeating-linear-gradient(-30deg,rgba(255,255,255,0.3)_0,rgba(255,255,255,0.3)_11px,rgba(255,255,255,0.08)_11px,rgba(255,255,255,0.08)_22px)] p-8 text-slate-800 md:order-1 sm:p-10 lg:p-12">
					<p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-indigo-700">
						Welcome back
					</p>
					<h1 className="mt-3 font-[ui-serif,Georgia,Cambria,serif] text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.08] text-slate-900">
						Sign in to continue
					</h1>
					<p className="mt-4 max-w-[32ch] leading-6 text-slate-600">
						Pick up where you left off with secure sessions and a fast login flow.
					</p>

					<div className="mt-8 space-y-3 text-sm text-slate-700">
						<p className="rounded-lg bg-white/60 px-3 py-2">Session-based authentication ready to use</p>
						<p className="rounded-lg bg-white/60 px-3 py-2">MongoDB adapter connected to your app</p>
						<p className="rounded-lg bg-white/60 px-3 py-2">Built for Next.js App Router patterns</p>
					</div>
				</aside>

				<article className="order-1 bg-white/90 p-7 md:order-2 sm:p-10 lg:p-12">
					<h2 className="m-0 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-[1.7rem] text-slate-900">
						Sign in
					</h2>
					<p className="mb-6 mt-2 text-slate-600">Enter your credentials to access your account.</p>

					<form action={signInAction} className="grid gap-[0.65rem]">
						<label className="mt-1 text-[0.92rem] font-semibold text-slate-700" htmlFor="email">
							Email
						</label>
						<input
							className="w-full rounded-xl border border-slate-300 bg-white px-4 py-[0.82rem] text-[0.96rem] text-slate-900 transition duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							required
						/>

						<label className="mt-1 text-[0.92rem] font-semibold text-slate-700" htmlFor="password">
							Password
						</label>
						<input
							className="w-full rounded-xl border border-slate-300 bg-white px-4 py-[0.82rem] text-[0.96rem] text-slate-900 transition duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
							id="password"
							name="password"
							type="password"
							placeholder="Your password"
							required
						/>

						<button
							className="mt-3 cursor-pointer rounded-xl border-none bg-linear-to-br from-indigo-600 to-cyan-600 px-4 py-[0.92rem] text-[0.98rem] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(79,70,229,0.34)] hover:saturate-110"
							type="submit"
						>
							Sign in
						</button>
					</form>

                     <div className="mt-10 flex w-full max-w-[66rem] items-center justify-center gap-3">
                                    <GoogleSignInButton />
                                </div>

					<p className="mt-4 text-[0.93rem] text-slate-600">
						New here?{" "}
						<Link className="font-bold text-indigo-700 hover:underline" href="/signup">
							Create account
						</Link>
					</p>
				</article>
			</section>
		</main>
	);
}

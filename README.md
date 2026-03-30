# Next.js + Better Auth Setup With MongoDB Adapter

এই project-এ কিভাবে Better Auth implement করতে হবে, MongoDB adapter connect করতে হবে, এবং register/login page এ auth-client function use করতে হবে, সেটা এই document-এ step-by-step দেখানো হয়েছে।

## Step 1: Install packages

প্রথমে নিচের packages install করতে হবে:

```bash
npm install better-auth mongodb @better-auth/mongo-adapter
```

## Step 2: Set environment variables

Root এ `.env.local` ফাইল create করে নিচের env variables set করো:

```env
BETTER_AUTH_SECRET=your_generated_secret
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Notes:

1. OAuth secrets কখনও `NEXT_PUBLIC_*` variable এ রাখবে না।
2. Production এ `BETTER_AUTH_URL` হবে deploy করা domain, যেমন `https://your-app.vercel.app`।

## Step 3: Configure Better Auth instance

Server auth config file: `src/app/utils/auth.js`

এই file এ Better Auth, Mongo adapter, email/password, social providers configure করা আছে।

Core structure:

```js
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const mongoUri = process.env.MONGODB_URI;
const client = new MongoClient(mongoUri);
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db),
	emailAndPassword: {
		enabled: true,
	},
	baseURL: process.env.BETTER_AUTH_URL,
	socialProviders: {
		google: {
			prompt: "select_account",
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		},
		github: {
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		},
	},
	plugins: [nextCookies()],
});
```

## Step 4: Mount auth handler

Route handler file: `src/app/api/auth/[...all]/route.js`

```js
import { auth } from "@/app/utils/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

## Step 5: Create auth client instance and helper functions

Client helper file: `src/app/lib/auth-client.js`

```js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const signUpWithEmail = async ({ name, email, password }) => {
	return authClient.signUp.email({
		name,
		email,
		password,
	});
};

export const signInWithEmail = async ({ email, password }) => {
	return authClient.signIn.email({
		email,
		password,
	});
};

export const signOutClient = async () => {
	return authClient.signOut();
};

export const socialSignIn = async (provider) => {
	return authClient.signIn.social({
		provider,
	});
};

export const googleSignIn = () => socialSignIn("google");
export const githubSignIn = () => socialSignIn("github");
```

## Step 6: Register page implementation (auth-client functions)

File: `src/app/register/page.jsx`

Implementation flow:

1. File এর top এ `"use client"` থাকবে।
2. `signUpWithEmail` import করতে হবে `../lib/auth-client` থেকে।
3. Form submit এ `event.preventDefault()` করতে হবে।
4. FormData থেকে `name`, `email`, `password` নিয়ে `signUpWithEmail` call করতে হবে।
5. Success হলে `router.push("/")` এবং `router.refresh()` করতে হবে।
6. Error হলে UI তে error message দেখাতে হবে।

## Step 7: Login page implementation (auth-client functions)

File: `src/app/login/page.jsx`

Implementation flow:

1. File এর top এ `"use client"` থাকবে।
2. `signInWithEmail` import করতে হবে `../lib/auth-client` থেকে।
3. Form submit এ `signInWithEmail({ email, password })` call করতে হবে।
4. Success হলে `router.push("/")` এবং `router.refresh()` করতে হবে।
5. Error হলে UI তে error message দেখাতে হবে।

## Step 8: Social sign-in button implementation

Reusable client component: `src/app/signup/GoogleSignInButton.jsx`

Flow:

1. `googleSignIn` এবং `githubSignIn` call করে social login trigger করা হয়।
2. Button click handler client component এর ভিতরে থাকবে।
3. Server component থেকে function prop pass করা যাবে না।

## Step 9: Session and sign out

এই project-এ দুইভাবে session/check + signout করা যাচ্ছে:

1. Server-side session:
	 `src/app/page.js` এ `auth.api.getSession({ headers: await headers() })`
2. Server action signout:
	 `src/app/actions/auth.js` এর `signOutAction`
3. Client-side signout (optional):
	 `signOutClient()` from `src/app/lib/auth-client.js`

## Step 10: Run locally

```bash
npm run dev
```

তারপর test করো:

1. Register with email/password
2. Login with email/password
3. Google sign-in
4. GitHub sign-in
5. Signout

## Step 11: Deploy on Vercel

Deploy command:

```bash
npx vercel --prod
```

Vercel project settings এ environment variables add করো:

1. BETTER_AUTH_SECRET
2. BETTER_AUTH_URL
3. MONGODB_URI
4. GOOGLE_CLIENT_ID
5. GOOGLE_CLIENT_SECRET
6. GITHUB_CLIENT_ID
7. GITHUB_CLIENT_SECRET

Env change এর পরে redeploy করো।

## Step 12: Common issues and quick fixes

1. `/api/auth/sign-in/email` এ 500:
	 `MONGODB_URI` invalid বা Mongo network access block.
2. `/api/auth/sign-in/social` এ 500:
	 OAuth client ID/secret mismatch বা callback URL mismatch.
3. Production এ কাজ করছে না:
	 Vercel env variables missing.
4. OAuth কাজ করছে না:
	 Google/GitHub console এ callback URL ঠিকমতো set করো:
	 `/api/auth/callback/google` এবং `/api/auth/callback/github`.

---

References:

1. https://better-auth.com/docs/installation
2. https://better-auth.com/docs/adapters/mongo
3. https://better-auth.com/docs/basic-usage

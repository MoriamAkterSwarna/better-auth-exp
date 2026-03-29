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
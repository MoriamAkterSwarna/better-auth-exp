import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/better-auth";
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
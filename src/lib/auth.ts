import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";

export const auth = betterAuth({
    trustedOrigins: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://www.raxhacks.com",
        "https://raxhacks.com",
        process.env.BETTER_AUTH_URL || "",
        process.env.NEXT_PUBLIC_APP_URL || "",
    ].filter(Boolean),
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
            strategy: "jwt"
        }
    },
    emailAndPassword: {
        enabled: true,
    }
});
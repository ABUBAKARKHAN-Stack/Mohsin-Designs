import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "./db";
import { sendEmail } from "./sendEmail";
import { admin } from "better-auth/plugins"
import { Roles } from "@/types/auth.types";


export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,

        //* ResetPassword Configurations
        resetPasswordTokenExpiresIn: 600, //? 10 Mins Token Expiry
        sendResetPassword: async ({ user, url, token }) => {
            void sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        },
    },

    user: {
        additionalFields: {
            role: {
                type: Object.values(Roles),
                required: false,
                defaultValue: Roles.USER,
            },
            permissions: {
                type: "json"
            }
        },
    },

    rateLimit: {
        enabled: true,
    },

    plugins: [
        admin()
    ]
});

export type Session = typeof auth.$Infer.Session

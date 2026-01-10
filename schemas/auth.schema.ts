import { Roles } from "@/types/auth.types";
import z from "zod";

export const signUpSchema = z
    .object({
        fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
        email: z.email({ message: "Please enter a valid email address" }).trim().max(255),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Must contain uppercase letter" })
            .regex(/[0-9]/, { message: "Must contain a number" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });


export type SignUpFormValues = z.infer<typeof signUpSchema>;



export const signInSchema = z.object({
    email: z.email({ message: "Please enter a valid email address" }).trim(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    rememberMe: z.boolean(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;


export const forgotPasswordSchema = z.object({
    email: z.email({ message: "Please enter a valid email address" }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;


export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Must contain uppercase letter" })
        .regex(/[0-9]/, { message: "Must contain a number" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;


export const addUserSchema = signUpSchema.extend({
    role: z.enum(Roles, {
        error: "Role is required",
    }),
})

export type AddUserFormValues = z.infer<typeof addUserSchema>;

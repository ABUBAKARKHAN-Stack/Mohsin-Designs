import { z } from "zod";
import { localizedStringSchema } from "./common";

export const blogPostSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    slug: z.object({
        current: z.string().min(1, "Slug is required"),
    }),
    author: z.string().min(1, "Author name is required"),
    location: z.string().optional(),
    service: z.string().optional(), // Reference ID
    publishedAt: z.string().optional(), // ISO date string
    mainImage: z.any().optional(), // Image object
    categories: z.array(z.string()).optional(), // Array of Reference IDs
    body: z.any().optional(), // Portable Text
});

export type BlogPostValues = z.infer<typeof blogPostSchema>;

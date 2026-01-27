import { z } from "zod";
import { localizedStringSchema, localizedTextSchema, requiredLocalizedArraySchema, requiredLocalizedStringSchema, requiredLocalizedTextSchema } from "./common";

export const blogPostSchema = z.object({
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema,
    featured: z.boolean().optional(),
    slug: z.object({
        current: z.string().min(1, "Slug is required"),
    }),
    readTime: z.number().min(1, "Read time must be at least 1 minute").optional(),
    author: z.string().min(1, "Author name is required"),
    tags: requiredLocalizedArraySchema,
    location: z.string().nullable().optional(),
    service: z.string().nullable().optional(), // Reference ID
    publishedAt: z.string().optional(), // ISO date string
    mainImage: z.any().optional(), // Image object
    categories: z.array(z.string()).optional(), // Array of Reference IDs
    body: z.object({
        en: z.array(z.any()).optional(),
        ur: z.array(z.any()).optional(),
        es: z.array(z.any()).optional(),
        ar: z.array(z.any()).optional(),
    }).superRefine((data, ctx) => {
        ['en', 'ur', 'es', 'ar'].forEach((lang) => {
            const content = (data as any)[lang] || [];
            const hasContent = content.some((block: any) =>
                block.children?.some((child: any) => child.text?.trim().length > 0)
            );

            if (!hasContent) {
                const label = lang === 'en' ? 'English' : lang === 'ur' ? 'Urdu' : lang === 'es' ? 'Spanish' : 'Arabic';
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `${label} body content is required`,
                    path: [lang]
                });
            }
        });
    }),
});

export type BlogPostValues = z.infer<typeof blogPostSchema>;

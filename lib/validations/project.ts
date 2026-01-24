import { z } from "zod";
import { requiredLocalizedStringSchema, requiredLocalizedTextSchema, localizedStringSchema, localizedTextSchema } from "./common";

export const projectSchema = z.object({
    title: requiredLocalizedStringSchema,
    slug: z.object({
        current: z.string().min(1, "Slug is required"),
    }),
    category: localizedStringSchema.optional(),
    description: requiredLocalizedTextSchema,
    tags: z.object({
        en: z.string().optional(),
        ur: z.string().optional(),
        es: z.string().optional(),
        ar: z.string().optional(),
    }).optional(),
    mainImage: z.any().optional(),
    caseStudy: z.object({
        title: localizedStringSchema.optional(),
        beforeImage: z.any().optional(),
        afterImage: z.any().optional(),
        testimonial: localizedTextSchema.optional(),
        slug: z.object({
            current: z.string().optional(),
        }).optional(),
        results: z.array(z.object({
            _key: z.string().optional(),
            icon: z.string().min(1, "Icon is required"),
            value: requiredLocalizedStringSchema,
            label: requiredLocalizedStringSchema,
        })).default([]),
    }).default({ results: [] }),
});

export type ProjectValues = z.infer<typeof projectSchema>;

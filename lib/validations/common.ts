import { z } from "zod";

export const localizedStringSchema = z.string().min(1, "Required");
export const requiredLocalizedStringSchema = z.string().min(1, "Required");
export const localizedTextSchema = z.string().min(1, "Required");
export const requiredLocalizedTextSchema = z.string().min(1, "Required");
export const localizedArraySchema = z.array(z.string());
export const requiredLocalizedArraySchema = z.array(z.string()).min(1, "At least one item required");

export const sectionHeadingSchema = z.object({
    _key: z.string().optional(),
    eyebrow: localizedStringSchema.optional(),
    title: requiredLocalizedStringSchema,
    description: localizedTextSchema.optional(),
});

export const seoSchema = z.object({
    metaTitle: localizedStringSchema.optional(),
    metaDescription: localizedTextSchema.optional(),
    focusKeyword: localizedStringSchema.optional(),
    relatedKeywords: localizedArraySchema.optional(),
    schemas: z.array(z.string()).transform(arr => arr.filter(s => s.trim() !== "")).optional(),
});
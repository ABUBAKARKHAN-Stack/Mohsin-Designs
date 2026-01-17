import { z } from "zod";

export const baseLocalizedStringSchema = z.object({
    _key: z.string().optional(),
    en: z.string().optional(),
    ur: z.string().optional(),
    es: z.string().optional(),
    ar: z.string().optional(),
});

export const localizedStringSchema = baseLocalizedStringSchema;

export const localizedTextSchema = z.object({
    _key: z.string().optional(),
    en: z.string().optional(),
    ur: z.string().optional(),
    es: z.string().optional(),
    ar: z.string().optional(),
});

// For strictly required fields
export const requiredLocalizedStringSchema = localizedStringSchema.refine(data => !!data.en && data.en.trim() !== "", {
    message: "English translation is required as the primary language",
    path: ["en"]
});

export const requiredLocalizedTextSchema = localizedTextSchema.refine(data => !!data.en && data.en.trim() !== "", {
    message: "English translation is required as the primary language",
    path: ["en"]
});

export const sectionHeadingSchema = z.object({
    _key: z.string().optional(),
    eyebrow: localizedStringSchema.optional(),
    title: requiredLocalizedStringSchema,
    description: localizedTextSchema.optional(),
});

export const strictMultiLanguageSchema = baseLocalizedStringSchema.refine(
    (data) => {
        const values = [data.en, data.ur, data.es, data.ar];
        const someHasContent = values.some(hasContent);
        if (!someHasContent) return true; // All empty is valid (optional)
        return values.every(hasContent); // If touched, all must be filled
    },
    {
        message: "All languages are required if this field is used",
        path: ["en"], // Highlight English field generally, or we could return multiple issues but Zod refine path is simple
    }
);


// Helper for "All or Nothing" validation
// If any language has content, ALL must have content.
const hasContent = (str?: string) => str && str.trim().length > 0;


export const strictMultiLanguageTextSchema = localizedTextSchema.refine(
    (data) => {
        const values = [data.en, data.ur, data.es, data.ar];
        const someHasContent = values.some(hasContent);
        if (!someHasContent) return true; // All empty is valid
        return values.every(hasContent);
    },
    {
        message: "All languages are required if this field is used",
        path: ["en"],
    }
);


export const seoSchema = z.object({
    metaTitle: strictMultiLanguageSchema.optional(),
    metaDescription: strictMultiLanguageTextSchema.optional(),
    schema: z.string().optional(),
    keywords: z.array(baseLocalizedStringSchema).optional().default([]),
});
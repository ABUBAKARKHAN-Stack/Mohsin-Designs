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
export const requiredLocalizedStringSchema = localizedStringSchema.superRefine(
    (data, ctx) => {
        ['en', 'ur', 'es', 'ar'].forEach((lang) => {
            const val = (data as any)[lang];
            if (!val || val.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `${lang.toUpperCase()} is required`,
                    path: [lang],
                });
            }
        });
    }
);

export const requiredLocalizedTextSchema = localizedTextSchema.superRefine(
    (data, ctx) => {
        ['en', 'ur', 'es', 'ar'].forEach((lang) => {
            const val = (data as any)[lang];
            if (!val || val.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `${lang.toUpperCase()} is required`,
                    path: [lang],
                });
            }
        });
    }
);

export const sectionHeadingSchema = z.object({
    _key: z.string().optional(),
    eyebrow: localizedStringSchema.optional(),
    title: requiredLocalizedStringSchema,
    description: localizedTextSchema.optional(),
});

export const strictMultiLanguageSchema = baseLocalizedStringSchema.superRefine(
    (data, ctx) => {
        const values = [data.en, data.ur, data.es, data.ar];
        const hasAny = values.some(val => val && val.trim() !== "");

        if (hasAny) {
            ['en', 'ur', 'es', 'ar'].forEach((lang) => {
                const val = (data as any)[lang];
                if (!val || val.trim() === "") {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `${lang.toUpperCase()} is required if this field is used`,
                        path: [lang],
                    });
                }
            });
        }
    }
);


// Helper for "All or Nothing" validation
// If any language has content, ALL must have content.
const hasContent = (str?: string) => str && str.trim().length > 0;


export const strictMultiLanguageTextSchema = localizedTextSchema.superRefine(
    (data, ctx) => {
        const values = [data.en, data.ur, data.es, data.ar];
        const hasAny = values.some(val => val && val.trim() !== "");

        if (hasAny) {
            ['en', 'ur', 'es', 'ar'].forEach((lang) => {
                const val = (data as any)[lang];
                if (!val || val.trim() === "") {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `${lang.toUpperCase()} is required if this field is used`,
                        path: [lang],
                    });
                }
            });
        }
    }
);


export const seoSchema = z.object({
    metaTitle: strictMultiLanguageSchema.optional(),
    metaDescription: strictMultiLanguageTextSchema.optional(),
    schema: z.string().optional(),
    keywords: z.array(baseLocalizedStringSchema).optional().default([]),
});
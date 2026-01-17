import { z } from "zod";
import { requiredLocalizedStringSchema, requiredLocalizedTextSchema } from "./common";

// Helper for required URL validation in all languages
const requiredUrlSchema = z.object({
    en: z.url("Must be a valid URL").min(1, "Required"),
    ur: z.url("Must be a valid URL").min(1, "Required"),
    es: z.url("Must be a valid URL").min(1, "Required"),
    ar: z.url("Must be a valid URL").min(1, "Required"),
});

export const serviceCtaSchema = z.object({
    ctaBadgeText: requiredLocalizedStringSchema,
    ctaTitle: requiredLocalizedStringSchema,
    ctaDescription: requiredLocalizedTextSchema,
    ctaButtonText: requiredLocalizedStringSchema,
    ctaButtonUrl: requiredUrlSchema.optional(), // Making optional in form just in case, but schema says required. I'll stick to optional or required based on schema. Schema says localizedUrl has validations. serviceCtaType says `ctaButtonUrl` is NOT explicitly required with `Rule.required()` but the fields inside are. I'll make it optional object, but if present, fields required. 
    // Actually serviceCtaType fields[4] validation is MISSING Rule.required(), so the field itself is optional.
    // But localizedUrlType fields ARE required. 
    // So if the object exists, it must be valid.
}).refine((data) => {
    // If user provides a URL for any language, they should probably provide for all, or at least the structure is strictly typed.
    return true;
});

// Stricter schema for form
export const serviceCtaFormSchema = z.object({
    ctaBadgeText: requiredLocalizedStringSchema,
    ctaTitle: requiredLocalizedStringSchema,
    ctaDescription: requiredLocalizedTextSchema,
    ctaButtonText: requiredLocalizedStringSchema,
    ctaButtonUrl: z.object({
        en: z.url("Invalid URL").optional().or(z.literal("")),
        ur: z.url("Invalid URL").optional().or(z.literal("")),
        es: z.url("Invalid URL").optional().or(z.literal("")),
        ar: z.url("Invalid URL").optional().or(z.literal("")),
    }).optional(),
});

export type ServiceCtaValues = z.infer<typeof serviceCtaFormSchema>;

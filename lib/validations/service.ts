import { z } from "zod";

const localizedStringSchema = z.object({
    _key: z.string().optional(),
    en: z.string().optional(),
    ur: z.string().optional(),
    es: z.string().optional(),
    ar: z.string().optional(),
}).refine(data => {
    const values = [data.en, data.ur, data.es, data.ar].filter(v => v && v.trim() !== "");
    // Either all are empty or all are filled
    return values.length === 0 || values.length === 4;
}, {
    message: "Missing translations. Please provide all 4 languages (EN, UR, ES, AR).",
    path: ["en"]
});

const localizedTextSchema = z.object({
    _key: z.string().optional(),
    en: z.string().optional(),
    ur: z.string().optional(),
    es: z.string().optional(),
    ar: z.string().optional(),
}).refine(data => {
    const values = [data.en, data.ur, data.es, data.ar].filter(v => v && v.trim() !== "");
    return values.length === 0 || values.length === 4;
}, {
    message: "Missing translations. Please provide all 4 languages (EN, UR, ES, AR).",
    path: ["en"]
});

// For strictly required fields, we add another refinement
const requiredLocalizedStringSchema = localizedStringSchema.refine(data => !!data.en && data.en.trim() !== "", {
    message: "English translation is required as the primary language",
    path: ["en"]
});

const requiredLocalizedTextSchema = localizedTextSchema.refine(data => !!data.en && data.en.trim() !== "", {
    message: "English translation is required as the primary language",
    path: ["en"]
});

const sectionHeadingSchema = z.object({
    _key: z.string().optional(),
    eyebrow: localizedStringSchema.optional(),
    title: requiredLocalizedStringSchema,
    description: localizedTextSchema.optional(),
});

export const seoSchema = z.object({
    metaTitle: localizedStringSchema.optional(),
    metaDescription: localizedTextSchema.optional(),
    schema: z.string().optional(),
    keywords: z.array(localizedStringSchema).optional(),
});

export const serviceFormSchema = z.object({
    title: requiredLocalizedStringSchema,
    subtitle: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema,
    slug: z.string().min(1, "Slug is required"),

    // Hero
    heroImage: z.object({
        _type: z.literal('image').optional(),
        asset: z.object({
            _type: z.literal('reference').optional(),
            _ref: z.string(),
        }).optional(),
    }).optional(),
    heroImageAlt: requiredLocalizedStringSchema,

    // Intro
    introTagLine: requiredLocalizedStringSchema,
    introTitle: requiredLocalizedStringSchema,
    introContent: requiredLocalizedTextSchema,

    // Role
    roleTitle: requiredLocalizedStringSchema,
    roleContent: z.array(requiredLocalizedTextSchema).min(1, "At least one role description is required"),

    // How We Help
    howWeHelpSection: sectionHeadingSchema,
    howWeHelpPoints: z.array(z.object({
        _key: z.string().optional(),
        title: requiredLocalizedStringSchema,
        description: requiredLocalizedTextSchema
    })).min(1, "Add at least one help point"),

    // Overview
    overviewSection: sectionHeadingSchema,
    items: z.array(requiredLocalizedStringSchema).min(2, "Add at least two items"),

    // Process
    processSection: sectionHeadingSchema,
    process: z.array(z.object({
        _key: z.string().optional(),
        step: z.string().min(1, "Step number is required"),
        title: requiredLocalizedStringSchema,
        desc: requiredLocalizedTextSchema
    })).min(1, "Add at least one process step"),

    // Areas
    areasSection: sectionHeadingSchema,
    areas: z.array(z.object({
        _key: z.string().optional(),
        region: requiredLocalizedStringSchema,
        locations: z.array(requiredLocalizedStringSchema).min(1, "Add at least one location"),
        featured: z.boolean().default(false),
        clients: z.coerce.number().min(0).default(0),
        flag: z.string().optional()
    })).min(1, "Add at least one area"),

    // Industries
    industriesSection: sectionHeadingSchema,
    industries: z.array(z.object({
        _key: z.string().optional(),
        name: requiredLocalizedStringSchema,
        description: requiredLocalizedTextSchema
    })).min(1, "Add at least one industry"),

    // Benefits
    benifitsSection: sectionHeadingSchema,
    benefits: z.array(requiredLocalizedStringSchema).min(1, "Add at least one benefit"),

    // Why Choose Us
    whyChooseUsSection: sectionHeadingSchema,
    whyChooseUsPoints: z.array(z.object({
        _key: z.string().optional(),
        title: requiredLocalizedStringSchema,
        description: requiredLocalizedTextSchema
    })).min(1, "Add at least one point"),

    // Case Studies
    caseStudiesSection: sectionHeadingSchema,
    caseStudies: z.array(z.object({
        _key: z.string().optional(),
        title: requiredLocalizedStringSchema,
        problem: requiredLocalizedTextSchema,
        solution: requiredLocalizedTextSchema,
        result: requiredLocalizedTextSchema
    })).min(1, "Add at least one case study"),

    // FAQs
    faqsSection: sectionHeadingSchema,
    faqs: z.array(z.object({
        _key: z.string().optional(),
        question: requiredLocalizedStringSchema,
        answer: requiredLocalizedTextSchema
    })).min(1, "Add at least one FAQ"),

    // SEO
    seo: seoSchema,
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

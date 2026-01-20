import { z } from "zod";
import { requiredLocalizedStringSchema, requiredLocalizedTextSchema, sectionHeadingSchema, strictMultiLanguageSchema, strictMultiLanguageTextSchema } from "./common";

export const aboutPageContentSchema = z.object({
    // Hero Section
    hero: z.object({
        title: requiredLocalizedStringSchema,
        subtitle: requiredLocalizedStringSchema.optional(),
        description: requiredLocalizedTextSchema.optional(),
    }),
    // Intro Section
    intro: z.object({
        badge: requiredLocalizedStringSchema,
        heading: requiredLocalizedStringSchema,
        description1: requiredLocalizedTextSchema,
        description2: requiredLocalizedTextSchema,
        quote: requiredLocalizedStringSchema.optional(),
        mainImage: z.any().optional(), // Image type
        sinceYear: z.number().min(1900).max(new Date().getFullYear()),
    }),

    // Mission & Vision Section
    missionVision: z.object({
        sectionHeading: sectionHeadingSchema,
        mission: z.object({
            eyebrow: requiredLocalizedStringSchema,
            title: requiredLocalizedStringSchema,
            description1: requiredLocalizedTextSchema,
            description2: requiredLocalizedTextSchema.optional(),
            keyPoints: z.array(requiredLocalizedStringSchema).optional()
        }),
        vision: z.object({
            eyebrow: requiredLocalizedStringSchema,
            title: requiredLocalizedStringSchema,
            description1: requiredLocalizedTextSchema,
            description2: requiredLocalizedTextSchema.optional(),
            keyPoints: z.array(requiredLocalizedStringSchema).optional()
        }),
    }),

    // Philosophy Section
    philosophy: z.object({
        sectionHeading: sectionHeadingSchema,
        quoteBlock: requiredLocalizedTextSchema,
        description1: requiredLocalizedTextSchema,
        description2: requiredLocalizedTextSchema,
        steps: z.array(z.object({
            _key: z.string().optional(),
            label: requiredLocalizedStringSchema,
            iconName: z.string().min(1, "Icon name is required")
        })).min(1, "At least one step is required"),
    }),

    // Global Reach Section
    globalReach: z.object({
        badge: requiredLocalizedStringSchema,
        heading: requiredLocalizedStringSchema,
        description1: requiredLocalizedTextSchema,
        description2: requiredLocalizedTextSchema,
        regions: z.array(requiredLocalizedStringSchema).min(1, "At least one region is required"),
        stats: z.array(z.object({
            _key: z.string().optional(),
            value: z.string().min(1, "Value is required"),
            label: requiredLocalizedStringSchema
        })).min(1, "At least one stat is required"),
    }),

    // Culture Section
    culture: z.object({
        sectionHeading: sectionHeadingSchema,
        values: z.array(z.object({
            _key: z.string().optional(),
            title: requiredLocalizedStringSchema,
            description: requiredLocalizedTextSchema,
            iconName: z.string().min(1, "Icon name is required")
        })).min(1, "At least one value is required"),
        quote: requiredLocalizedStringSchema.optional(),
        quoteHighlight: requiredLocalizedStringSchema.optional(),
    }),

    // Global Sections (Optional in this schema as they are managed globally)
    stats: z.any().optional(),
    servicesPreview: z.any().optional(),
    whyChooseUs: z.any().optional(),
    ourApproach: z.any().optional(),
    industriesWeServe: z.any().optional(),
    faqs: z.any().optional(),
    leadership: z.any().optional(),
    cta: z.any().optional(),
});

export type AboutPageContentValues = z.infer<typeof aboutPageContentSchema>;

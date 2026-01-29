import { z } from "zod";
import { sectionHeadingSchema } from "./common";

export const aboutPageContentSchema = z.object({
    // Hero Section
    hero: z.object({
        title: z.string().min(1, "Title is required"),
        subtitle: z.string().optional(),
        description: z.string().optional(),
    }),
    // Intro Section
    intro: z.object({
        badge: z.string().min(1, "Badge is required"),
        heading: z.string().min(1, "Heading is required"),
        description1: z.string().min(1, "Description 1 is required"),
        description2: z.string().min(1, "Description 2 is required"),
        quote: z.string().optional(),
        mainImage: z.any().optional(), // Image type
        sinceYear: z.number().min(1900).max(new Date().getFullYear()),
    }),

    // Mission & Vision Section
    missionVision: z.object({
        sectionHeading: sectionHeadingSchema,
        mission: z.object({
            eyebrow: z.string().min(1, "Eyebrow is required"),
            title: z.string().min(1, "Title is required"),
            description1: z.string().min(1, "Description 1 is required"),
            description2: z.string().optional(),
            keyPoints: z.array(z.string()).optional()
        }),
        vision: z.object({
            eyebrow: z.string().min(1, "Eyebrow is required"),
            title: z.string().min(1, "Title is required"),
            description1: z.string().min(1, "Description 1 is required"),
            description2: z.string().optional(),
            keyPoints: z.array(z.string()).optional()
        }),
    }),

    // Philosophy Section
    philosophy: z.object({
        sectionHeading: sectionHeadingSchema,
        quoteBlock: z.string().min(1, "Quote block is required"),
        description1: z.string().min(1, "Description 1 is required"),
        description2: z.string().min(1, "Description 2 is required"),
        steps: z.array(z.object({
            _key: z.string().optional(),
            label: z.string().min(1, "Label is required"),
            iconName: z.string().min(1, "Icon name is required")
        })).min(1, "At least one step is required"),
    }),

    // Global Reach Section
    globalReach: z.object({
        badge: z.string().min(1, "Badge is required"),
        heading: z.string().min(1, "Heading is required"),
        description1: z.string().min(1, "Description 1 is required"),
        description2: z.string().min(1, "Description 2 is required"),
        regions: z.array(z.string()).min(1, "At least one region is required"),
        stats: z.array(z.object({
            _key: z.string().optional(),
            value: z.string().min(1, "Value is required"),
            label: z.string().min(1, "Label is required")
        })).min(1, "At least one stat is required"),
    }),

    // Culture Section
    culture: z.object({
        sectionHeading: sectionHeadingSchema,
        values: z.array(z.object({
            _key: z.string().optional(),
            title: z.string().min(1, "Title is required"),
            description: z.string().min(1, "Description is required"),
            iconName: z.string().min(1, "Icon name is required")
        })).min(1, "At least one value is required"),
        quote: z.string().optional(),
        quoteHighlight: z.string().optional(),
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

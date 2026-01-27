import { z } from "zod";
import { requiredLocalizedStringSchema, requiredLocalizedTextSchema } from "./common";

// Process Step Schema
const processStepSchema = z.object({
    _key: z.string().optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema,
    duration: requiredLocalizedStringSchema,
    iconName: z.string().min(1, "Icon name is required"),
});

// Benefit Schema
const benefitSchema = z.object({
    _key: z.string().optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema,
    iconName: z.string().min(1, "Icon name is required"),
});

// Section Heading Schema
const sectionHeadingSchema = z.object({
    eyebrow: requiredLocalizedStringSchema.optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema.optional(),
});

// Main Services Page Content Schema
export const servicesPageContentSchema = z.object({
    // Hero Section
    hero: z.object({
        title: requiredLocalizedStringSchema,
        subtitle: requiredLocalizedStringSchema,
        description: requiredLocalizedTextSchema,
    }),

    // Intro Section
    intro: z.object({
        badgeText: requiredLocalizedStringSchema,
        heading: requiredLocalizedStringSchema,
        headingAccent: requiredLocalizedStringSchema,
        description: requiredLocalizedTextSchema,
    }),

    // Process Section
    process: z.object({
        sectionHeading: sectionHeadingSchema,
        steps: z.array(processStepSchema).min(1, "At least one process step is required"),
    }),

    // Why Choose Us Section
    whyChooseUs: z.object({
        sectionHeading: z.object({
            eyebrow: requiredLocalizedStringSchema,
            title: requiredLocalizedStringSchema,
            description: requiredLocalizedTextSchema,
        }),
        guaranteePoints: z.array(requiredLocalizedStringSchema).min(1, "At least one guarantee point is required"),
        benefits: z.array(benefitSchema).min(1, "At least one benefit is required"),
    }),
});

export type ServicesPageContentValues = z.infer<typeof servicesPageContentSchema>;

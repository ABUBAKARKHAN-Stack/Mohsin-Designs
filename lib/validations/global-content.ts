import { z } from "zod";
import { requiredLocalizedStringSchema, requiredLocalizedTextSchema } from "./common";

// Heading Line Schema (if needed, but usually for Hero)
// We already have sectionHeadingSchema in common, or let's redefine it here if needed

const sectionHeadingSchema = z.object({
    eyebrow: requiredLocalizedStringSchema.optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema.optional(),
});

// Stat Schema
const statSchema = z.object({
    _key: z.string().optional(),
    value: requiredLocalizedStringSchema.optional(),
    label: requiredLocalizedStringSchema.optional(),
    suffix: z.string().optional(),
});

// Benefit Schema
const benefitSchema = z.object({
    _key: z.string().optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema,
    iconName: z.string().min(1, "Icon name is required"),
});

// Step Schema
const stepSchema = z.object({
    _key: z.string().optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema,
    featured: z.boolean().optional(),
    iconName: z.string().min(1, "Icon is required"),
});

// Industry Schema
const industrySchema = z.object({
    _key: z.string().optional(),
    name: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema.optional(),
    iconName: z.string().min(1, "Icon name is required"),
});

// Agency Structure Schema
const teamSchema = z.object({
    _key: z.string().optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedStringSchema,
    featured: z.boolean().optional(),
    iconName: z.string().min(1, "Icon is required"),
});

// Social Link Schema
const socialLinkSchema = z.object({
    _key: z.string().optional(),
    platform: z.enum(['linkedin', 'twitter', 'email']),
    url: z.string().url("Must be a valid URL"),
});

export const globalContentSchema = z.object({
    stats: z.object({
        projectsDelivered: statSchema,
        yearsExperience: statSchema,
        clientSatisfaction: statSchema,
    }).optional(),

    servicesPreview: z.object({
        sectionHeading: sectionHeadingSchema,
    }).optional(),

    whyChooseUs: z.object({
        sectionHeading: sectionHeadingSchema,
        benefits: z.array(benefitSchema).min(1),
    }).optional(),

    ourApproach: z.object({
        sectionHeading: sectionHeadingSchema,
        steps: z.array(stepSchema).min(1),
    }).optional(),

    industriesWeServe: z.object({
        sectionHeading: sectionHeadingSchema,
        industries: z.array(industrySchema).min(1),
    }).optional(),

    leadership: z.object({
        sectionHeading: sectionHeadingSchema,
        founder: z.object({
            name: requiredLocalizedStringSchema,
            role: requiredLocalizedStringSchema,
            image: z.any().optional(),
            socialLinks: z.array(socialLinkSchema).optional(),
        }),
        agencyStructure: z.array(teamSchema).min(1),
    }).optional(),

    cta: z.object({
        badge: requiredLocalizedStringSchema,
        heading: requiredLocalizedStringSchema,
        description: requiredLocalizedTextSchema,
        benefits: z.array(z.object({
            _key: z.string().optional(),
            text: requiredLocalizedStringSchema,
        })).min(1),
        formId: z.string().optional(),
    }).optional(),
});

export type GlobalContentValues = z.infer<typeof globalContentSchema>;

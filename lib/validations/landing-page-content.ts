import { z } from "zod";
import { requiredLocalizedStringSchema, requiredLocalizedTextSchema } from "./common";

// Helper for URL validation
const requiredUrlSchema = z.object({
    en: z.string().url("Must be a valid URL").min(1, "Required"),
    ur: z.string().url("Must be a valid URL").min(1, "Required"),
    es: z.string().url("Must be a valid URL").min(1, "Required"),
    ar: z.string().url("Must be a valid URL").min(1, "Required"),
});

// Heading Line Schema
const headingLineSchema = z.object({
    _key: z.string().optional(),
    text: requiredLocalizedStringSchema,
    style: z.enum(['normal', 'stroke', 'gradient']),
});

// Description Paragraph Schema
const descriptionParagraphSchema = z.object({
    _key: z.string().optional(),
    text: requiredLocalizedTextSchema,
});

// CTA Button Schema
const ctaButtonSchema = z.object({
    _key: z.string().optional(),
    text: requiredLocalizedStringSchema,
    url: requiredUrlSchema,
    variant: z.enum(['primary', 'secondary']),
});

// Stat Schema
const statSchema = z.object({
    _key: z.string().optional(),
    value: z.string().min(1, "Value must be at least 1"),
    label: requiredLocalizedStringSchema,
    suffix: z.string().min(1, "Suffix is required (e.g., +, %)"),
});

// Benefit Schema
const benefitSchema = z.object({
    _key: z.string().optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema,
    iconName: z.string().min(1, "Icon name is required"),
});

// FAQ Schema
const faqSchema = z.object({
    _key: z.string().optional(),
    question: requiredLocalizedStringSchema,
    answer: requiredLocalizedTextSchema,
});

// Section Heading Schema
const sectionHeadingSchema = z.object({
    eyebrow: requiredLocalizedStringSchema.optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema.optional(),
});

// Main Landing Page Content Schema
export const landingPageContentSchema = z.object({
    // Hero Section
    hero: z.object({
        badge: requiredLocalizedStringSchema,
        headingLines: z.array(headingLineSchema).min(1, "At least one heading line is required").max(3, "Maximum 3 heading lines allowed"),
        descriptionParagraphs: z.array(descriptionParagraphSchema).min(1, "At least one paragraph is required").max(5, "Maximum 5 paragraphs allowed"),
        ctaButtons: z.array(ctaButtonSchema).length(2, "Exactly 2 CTA buttons are required"),
    }),

    // Services Preview Section
    servicesPreview: z.object({
        sectionHeading: sectionHeadingSchema,
    }),

    // Portfolio Preview Section
    portfolioPreview: z.object({
        sectionHeading: sectionHeadingSchema,
    }),

    // About Preview Section
    aboutPreview: z.object({
        sectionHeading: sectionHeadingSchema,
        leftDescriptions: z.array(z.object({
            _key: z.string().optional(),
            text: requiredLocalizedTextSchema
        })).min(2, "Exactly 2 left descriptions required").max(2, "Exactly 2 left descriptions required"),
        rightDescriptions: z.array(z.object({
            _key: z.string().optional(),
            text: requiredLocalizedTextSchema
        })).min(2, "Exactly 2 right descriptions required").max(2, "Exactly 2 right descriptions required"),
        ctaText: requiredLocalizedStringSchema,
        ctaUrl: requiredUrlSchema,
    }),

    // Stats Section
    stats: z.object({
        projectsDelivered: statSchema,
        yearsExperience: statSchema,
        clientSatisfaction: statSchema,
    }),

    // Why Choose Us Section
    whyChooseUs: z.object({
        sectionHeading: sectionHeadingSchema,
        benefits: z.array(benefitSchema).min(1, "At least one benefit is required"),
    }),

    // Blog Preview Section
    blogPreview: z.object({
        sectionHeading: sectionHeadingSchema,
    }),

    // FAQs Section
    faqs: z.object({
        sectionHeading: sectionHeadingSchema,
        faqItems: z.array(faqSchema).min(1, "At least one FAQ is required"),
        buttonText: requiredLocalizedStringSchema.optional(),
        buttonUrl: requiredLocalizedStringSchema.optional(),
    }),

    // Service Highlights Marquee
    serviceHighlightsMarquee: z.object({
        highlights: z.array(z.object({
            _key: z.string().optional(),
            text: requiredLocalizedStringSchema,
        })).min(1, "At least one highlight is required"),
    }),

    // Trusted By Brands
    trustedByBrands: z.object({
        sectionHeading: sectionHeadingSchema,
        brandLogos: z.array(z.any()).min(1, "At least one brand logo is required"), // Array of Sanity image references
    }),

    // Our Approach
    ourApproach: z.object({
        sectionHeading: sectionHeadingSchema,
        steps: z.array(z.object({
            _key: z.string().optional(),
            title: requiredLocalizedStringSchema,
            description: requiredLocalizedTextSchema,
            featured: z.boolean().optional(),
            iconName: z.string().min(1, "Icon is required"),
        })).min(1, "At least one step is required"),
    }),

    // Case Studies Preview
    caseStudiesPreview: z.object({
        sectionHeading: sectionHeadingSchema,
    }),

    // Areas We Serve
    areasWeServe: z.object({
        sectionHeading: sectionHeadingSchema,
        areas: z.array(z.object({
            _key: z.string().optional(),
            region: requiredLocalizedStringSchema,
            locations: z.array(requiredLocalizedStringSchema).min(1, "At least one location is required"),
            featured: z.boolean().optional(),
            clients: z.number().min(0).optional(),
            flag: z.string().max(10).optional(),
        })).min(1, "At least one region is required"),
    }),

    // Industries We Serve
    industriesWeServe: z.object({
        sectionHeading: sectionHeadingSchema,
        industries: z.array(z.object({
            _key: z.string().optional(),
            name: requiredLocalizedStringSchema,
            description: requiredLocalizedTextSchema.optional(),
            iconName: z.string().min(1, "Icon name is required"),
        })).min(1, "At least one industry is required"),
    }),

    // Testimonials
    testimonials: z.object({
        sectionHeading: sectionHeadingSchema,
        testimonials: z.array(z.object({
            _key: z.string().optional(),
            quote: requiredLocalizedTextSchema,
            author: requiredLocalizedStringSchema,
            role: requiredLocalizedStringSchema,
            company: requiredLocalizedStringSchema.optional(),
            avatar: z.any().optional(), // Image type
        })).min(1, "At least one testimonial is required"),
    }),

    // Leadership
    leadership: z.object({
        sectionHeading: sectionHeadingSchema,
        founder: z.object({
            name: requiredLocalizedStringSchema,
            role: requiredLocalizedStringSchema,
            image: z.any(), // Image type
            socialLinks: z.array(z.object({
                _key: z.string().optional(),
                platform: z.enum(['linkedin', 'twitter', 'email']),
                url: z.string().url("Must be a valid URL"),
            })).optional(),
        }),
        agencyStructure: z.array(z.object({
            _key: z.string().optional(),
            title: requiredLocalizedStringSchema,
            description: requiredLocalizedStringSchema,
            featured: z.boolean().optional(),
            iconName: z.string().min(1, "Icon is required"),
        })).min(1, "At least one team is required"),
    }),

    // CTA
    cta: z.object({
        badge: requiredLocalizedStringSchema,
        heading: requiredLocalizedStringSchema,
        description: requiredLocalizedTextSchema,
        benefits: z.array(z.object({
            _key: z.string().optional(),
            text: requiredLocalizedStringSchema,
        })).min(1, "At least one benefit is required"),
        formId: z.string().optional(), // Reference to form document
    }),

});

export type LandingPageContentValues = z.infer<typeof landingPageContentSchema>;

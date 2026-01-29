import { z } from "zod";

// Heading Line Schema
const headingLineSchema = z.object({
    _key: z.string().optional(),
    text: z.string().min(1, "Text is required"),
    style: z.enum(['normal', 'stroke', 'gradient']),
});

// Description Paragraph Schema
const descriptionParagraphSchema = z.object({
    _key: z.string().optional(),
    text: z.string().min(1, "Text is required"),
});

// CTA Button Schema
const ctaButtonSchema = z.object({
    _key: z.string().optional(),
    text: z.string().min(1, "Text is required"),
    url: z.string().url("Must be a valid URL").min(1, "Required"),
    variant: z.enum(['primary', 'secondary']),
});

// Stat Schema
const statSchema = z.object({
    _key: z.string().optional(),
    value: z.string().min(1, "Value must be at least 1"),
    label: z.string().min(1, "Label is required"),
    suffix: z.string().min(1, "Suffix is required (e.g., +, %)"),
});

// Benefit Schema
const benefitSchema = z.object({
    _key: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    iconName: z.string().min(1, "Icon name is required"),
});

// FAQ Schema
const faqSchema = z.object({
    _key: z.string().optional(),
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
});

// Section Heading Schema
const sectionHeadingSchema = z.object({
    eyebrow: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

// Main Landing Page Content Schema
export const landingPageContentSchema = z.object({
    // Hero Section
    hero: z.object({
        badge: z.string().min(1, "Badge is required"),
        headingLines: z.array(headingLineSchema).min(1, "At least one heading line is required").max(3, "Maximum 3 heading lines allowed"),
        descriptionParagraphs: z.array(descriptionParagraphSchema).min(1, "At least one paragraph is required").max(5, "Maximum 5 paragraphs allowed"),
        ctaButtons: z.array(ctaButtonSchema).length(2, "Exactly 2 CTA buttons are required"),
        featuredServices: z.array(z.string()).max(8).optional(),
    }),

    // Services Preview Section
    servicesPreview: z.object({
        sectionHeading: sectionHeadingSchema,
    }),

    // Portfolio Preview Section
    portfolioPreview: z.object({
        sectionHeading: sectionHeadingSchema,
        featuredProjects: z.array(z.string()).max(8).optional(),
    }),

    // About Preview Section
    aboutPreview: z.object({
        sectionHeading: sectionHeadingSchema,
        leftDescriptions: z.array(z.object({
            _key: z.string().optional(),
            text: z.string().min(1, "Text is required")
        })).min(2, "Exactly 2 left descriptions required").max(2, "Exactly 2 left descriptions required"),
        rightDescriptions: z.array(z.object({
            _key: z.string().optional(),
            text: z.string().min(1, "Text is required")
        })).min(2, "Exactly 2 right descriptions required").max(2, "Exactly 2 right descriptions required"),
        ctaText: z.string().min(1, "CTA Text is required"),
        ctaUrl: z.string().url("Must be a valid URL").min(1, "Required"),
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
        buttonText: z.string().optional(),
        buttonUrl: z.string().optional(),
    }),

    // Service Highlights Marquee
    serviceHighlightsMarquee: z.object({
        highlights: z.array(z.object({
            _key: z.string().optional(),
            text: z.string().min(1, "Text is required"),
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
            title: z.string().min(1, "Title is required"),
            description: z.string().min(1, "Description is required"),
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
            region: z.string().min(1, "Region is required"),
            locations: z.array(z.string()).min(1, "At least one location is required"),
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
            name: z.string().min(1, "Name is required"),
            description: z.string().optional(),
            iconName: z.string().min(1, "Icon name is required"),
        })).min(1, "At least one industry is required"),
    }),

    // Testimonials
    testimonials: z.object({
        sectionHeading: sectionHeadingSchema,
        testimonials: z.array(z.object({
            _key: z.string().optional(),
            quote: z.string().min(1, "Quote is required"),
            author: z.string().min(1, "Author is required"),
            role: z.string().min(1, "Role is required"),
            company: z.string().optional(),
            avatar: z.any().optional(), // Image type
        })).min(1, "At least one testimonial is required"),
    }),

    // Leadership
    leadership: z.object({
        sectionHeading: sectionHeadingSchema,
        founder: z.object({
            name: z.string().min(1, "Name is required"),
            role: z.string().min(1, "Role is required"),
            image: z.any(), // Image type
            socialLinks: z.array(z.object({
                _key: z.string().optional(),
                platform: z.enum(['linkedin', 'twitter', 'email']),
                url: z.string().url("Must be a valid URL"),
            })).optional(),
        }),
        agencyStructure: z.array(z.object({
            _key: z.string().optional(),
            title: z.string().min(1, "Title is required"),
            description: z.string().min(1, "Description is required"),
            featured: z.boolean().optional(),
            iconName: z.string().min(1, "Icon is required"),
        })).min(1, "At least one team is required"),
    }),

    // CTA
    cta: z.object({
        badge: z.string().min(1, "Badge is required"),
        heading: z.string().min(1, "Heading is required"),
        description: z.string().min(1, "Description is required"),
        benefits: z.array(z.object({
            _key: z.string().optional(),
            text: z.string().min(1, "Text is required"),
        })).min(1, "At least one benefit is required"),
        formId: z.string().optional(), // Reference to form document
    }),

});

export type LandingPageContentValues = z.infer<typeof landingPageContentSchema>;

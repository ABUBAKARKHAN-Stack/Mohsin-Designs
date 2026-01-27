"use client";

import { createContext, useContext, ReactNode } from "react";

// Define the type based on what getLandingPageContent returns
export type LandingPageContentData = {
    hero?: {
        badge?: string;
        headingLines?: Array<{
            text: string;
            style: 'normal' | 'stroke' | 'gradient';
        }>;
        descriptionParagraphs?: Array<{
            text: string;
        }>;
        ctaButtons?: Array<{
            text: string;
            url: string;
            variant: 'primary' | 'secondary';
        }>;
    };
    servicesPreview?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
    };
    portfolioPreview?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
    };
    aboutPreview?: {
        sectionHeading: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
        leftDescriptions?: Array<{ text: string }>;
        rightDescriptions?: Array<{ text: string }>;
        ctaText?: string;
        ctaUrl?: string;
    };
    stats?: {
        projectsDelivered?: {
            value: string;
            label: string;
            suffix: string;
        };
        yearsExperience?: {
            value: string;
            label: string;
            suffix: string;
        };
        clientSatisfaction?: {
            value: string;
            label: string;
            suffix: string;
        };
    };
    whyChooseUs?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
        benefits?: Array<{
            title: string;
            description: string;
            iconName: string;
        }>;
    };
    faqs?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
        faqItems?: Array<{
            question: string;
            answer: string;
        }>;
        buttonText?: string;
        buttonUrl?: string;
    };
    serviceHighlightsMarquee?: {
        highlights?: Array<{
            text: string;
        }>;
    };
    trustedByBrands?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
        brandLogos?: Array<{
            asset?: {
                _id: string;
                url: string;
                altText?: string;
            };
        }>;
    };
    ourApproach?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
        steps?: Array<{
            title: string;
            description: string;
            featured?: boolean;
            iconName: string;
        }>;
    };
    caseStudiesPreview?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
    };
    areasWeServe?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
        areas?: Array<{
            region: string;
            locations: string[];
            featured?: boolean;
            clients: number;
            flag: string;
        }>;
    };
    industriesWeServe?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
        industries?: Array<{
            name: string;
            description: string;
            iconName: string;
        }>;
    };
    leadership?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
        founder?: {
            name: string;
            role: string;
            image?: {
                _id: string;
                url: string;
            };
            socialLinks?: Array<{
                platform: string;
                url: string;
            }>;
        };
        agencyStructure?: Array<{
            title: string;
            description: string;
            featured?: boolean;
            iconName: string;
        }>;
    };
    testimonials?: {
        sectionHeading?: {
            eyebrow?: string;
            title?: string;
            description?: string;
        };
        testimonials?: Array<{
            quote: string;
            author: string;
            role: string;
            company: string;
            avatar?: {
                _id: string;
                url: string;
            };
        }>;
    };
    cta?: {
        badge?: string;
        heading?: string;
        description?: string;
        benefits?: Array<{
            text: string;
        }>;
        formId?: string;
    };
};

type LandingPageContentContextType = {
    landingPageContent: LandingPageContentData | null;
};

const LandingPageContentContext = createContext<LandingPageContentContextType | null>(null);

export const LandingPageContentProvider = ({
    children,
    landingPageContent
}: {
    children: ReactNode;
    landingPageContent: LandingPageContentData | null;
}) => {
    return (
        <LandingPageContentContext.Provider value={{ landingPageContent }}>
            {children}
        </LandingPageContentContext.Provider>
    );
};

export const useLandingPageContent = () => {
    const ctx = useContext(LandingPageContentContext);
    if (!ctx) throw new Error("useLandingPageContent must be inside LandingPageContentProvider");
    return ctx;
};

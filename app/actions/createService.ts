'use server'

import { serviceFormSchema, ServiceFormValues } from "@/lib/validations/service"
import { adminClient } from "@/sanity/lib/admin-client"
import { revalidatePath } from "next/cache"
import { slugify } from "@/lib/utils"

export async function createService(data: ServiceFormValues) {
    try {
        const validatedFields = serviceFormSchema.parse(data)
        const slug = validatedFields.slug || slugify(validatedFields.title.en!)

        const doc = {
            _type: 'service',
            title: validatedFields.title,
            subtitle: validatedFields.subtitle,
            description: validatedFields.description,
            slug: { current: slug },

            // Hero Image - Note: Image upload needs to be handled separately
            // For now, we'll skip the heroImage field or you need to implement asset upload
            ...(validatedFields.heroImage && {
                heroImage: {
                    _type: 'image',
                    asset: validatedFields.heroImage.asset,
                    alt: validatedFields.heroImageAlt
                }
            }),

            // Intro Section
            introTagLine: validatedFields.introTagLine,
            introTitle: validatedFields.introTitle,
            introContent: validatedFields.introContent,

            // Role Section
            roleTitle: validatedFields.roleTitle,
            roleContent: validatedFields.roleContent,

            // How We Help Section
            howWeHelpSection: {
                _type: 'sectionHeading',
                ...validatedFields.howWeHelpSection
            },
            howWeHelpPoints: validatedFields.howWeHelpPoints,

            // Overview Section
            overviewSection: {
                _type: 'sectionHeading',
                ...validatedFields.overviewSection
            },
            items: validatedFields.items,

            // Process Section
            processSection: {
                _type: 'sectionHeading',
                ...validatedFields.processSection
            },
            process: validatedFields.process,

            // Areas Section
            areasSection: {
                _type: 'sectionHeading',
                ...validatedFields.areasSection
            },
            areas: validatedFields.areas,

            // Industries Section
            industriesSection: {
                _type: 'sectionHeading',
                ...validatedFields.industriesSection
            },
            industries: validatedFields.industries,

            // Benefits Section
            benifitsSection: {
                _type: 'sectionHeading',
                ...validatedFields.benifitsSection
            },
            benefits: validatedFields.benefits,

            // Why Choose Us Section
            whyChooseUsSection: {
                _type: 'sectionHeading',
                ...validatedFields.whyChooseUsSection
            },
            whyChooseUsPoints: validatedFields.whyChooseUsPoints,

            // Case Studies Section
            caseStudiesSection: {
                _type: 'sectionHeading',
                ...validatedFields.caseStudiesSection
            },
            caseStudies: validatedFields.caseStudies,

            // FAQs Section
            faqsSection: {
                _type: 'sectionHeading',
                ...validatedFields.faqsSection
            },
            faqs: validatedFields.faqs,

            // SEO
            seo: validatedFields.seo
        }

        const result = await adminClient.create(doc)

        return { success: true, id: result._id }

    } catch (error: any) {
        console.error("Failed to create service:", error)
        return { success: false, error: error.message }
    }
}

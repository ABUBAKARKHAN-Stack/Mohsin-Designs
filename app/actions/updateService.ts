'use server'

import { serviceFormSchema, ServiceFormValues } from "@/lib/validations/service"
import { adminClient } from "@/sanity/lib/admin-client"
import { revalidatePath } from "next/cache"

export async function updateService(id: string, data: ServiceFormValues) {
    try {
        if (!id) {
            return { success: false, error: "Service ID is required" }
        }

        const validatedFields = serviceFormSchema.parse(data)

        const updateData = {
            title: validatedFields.title,
            subtitle: validatedFields.subtitle,
            description: validatedFields.description,
            slug: { current: validatedFields.slug },

            // Hero Image
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

        await adminClient.patch(id).set(updateData).commit()

        return { success: true, id }

    } catch (error: any) {
        console.error("Failed to update service:", error)
        return { success: false, error: error.message }
    }
}

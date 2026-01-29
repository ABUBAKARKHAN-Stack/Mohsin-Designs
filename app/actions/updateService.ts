'use server'

import { serviceFormSchema, ServiceFormValues } from "@/lib/validations/service"
import { adminClient } from "@/sanity/lib/admin-client"

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

            ...(validatedFields.heroImage && {
                heroImage: {
                    _type: 'image',
                    asset: validatedFields.heroImage.asset,
                    alt: validatedFields.heroImageAlt
                }
            }),

            introTagLine: validatedFields.introTagLine,
            introTitle: validatedFields.introTitle,
            introContent: validatedFields.introContent,

            roleTitle: validatedFields.roleTitle,
            roleContent: validatedFields.roleContent,

            howWeHelpSection: {
                _type: 'sectionHeading',
                ...validatedFields.howWeHelpSection
            },
            howWeHelpPoints: validatedFields.howWeHelpPoints,

            overviewSection: {
                _type: 'sectionHeading',
                ...validatedFields.overviewSection
            },
            items: validatedFields.items,

            processSection: {
                _type: 'sectionHeading',
                ...validatedFields.processSection
            },
            process: validatedFields.process,

            areasSection: {
                _type: 'sectionHeading',
                ...validatedFields.areasSection
            },
            areas: validatedFields.areas,

            industriesSection: {
                _type: 'sectionHeading',
                ...validatedFields.industriesSection
            },
            industries: validatedFields.industries,

            benifitsSection: {
                _type: 'sectionHeading',
                ...validatedFields.benifitsSection
            },
            benefits: validatedFields.benefits,

            whyChooseUsSection: {
                _type: 'sectionHeading',
                ...validatedFields.whyChooseUsSection
            },
            whyChooseUsPoints: validatedFields.whyChooseUsPoints,

            caseStudiesSection: {
                _type: 'sectionHeading',
                ...validatedFields.caseStudiesSection
            },
            caseStudies: validatedFields.caseStudies,

            faqsSection: {
                _type: 'sectionHeading',
                ...validatedFields.faqsSection
            },
            faqs: validatedFields.faqs,

            seo: validatedFields.seo
        }

        await adminClient.patch(id).set(updateData).commit()

        return { success: true, id }

    } catch (error: any) {
        console.error("Failed to update service:", error)
        return { success: false, error: error.message }
    }
}

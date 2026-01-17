'use server'

import { servicesPageContentSchema, ServicesPageContentValues } from "@/lib/validations/services-page-content"
import { adminClient } from "@/sanity/lib/admin-client"
import { sanityFetch } from "@/sanity/lib/live"

const SERVICES_PAGE_CONTENT_ID = 'servicesPageContent'

export async function getServicesPageContentForAdmin() {
    try {
        const query = `*[_type == "servicesPageContent"][0]`
        const { data } = await sanityFetch({ query })
        return data
    } catch (error) {
        console.error("Failed to fetch services page content:", error)
        return null
    }
}

export async function updateServicesPageContent(data: ServicesPageContentValues) {
    try {
        const validatedFields = servicesPageContentSchema.parse(data)

        const updateData: any = {
            _type: 'servicesPageContent',
            _id: SERVICES_PAGE_CONTENT_ID,
            hero: validatedFields.hero,
            intro: validatedFields.intro,
            process: {
                sectionHeading: validatedFields.process.sectionHeading,
                steps: validatedFields.process.steps,
            },
            whyChooseUs: {
                sectionHeading: validatedFields.whyChooseUs.sectionHeading,
                guaranteePoints: validatedFields.whyChooseUs.guaranteePoints,
                benefits: validatedFields.whyChooseUs.benefits,
            },
        }

        await adminClient.createOrReplace(updateData)

        return { success: true }

    } catch (error: any) {
        console.error("Failed to update services page content:", error)
        const errorMessage = error.response?.body?.message || error.message || "Failed to update content"
        return {
            success: false,
            error: errorMessage
        }
    }
}

'use server'

import { landingPageContentSchema, LandingPageContentValues } from "@/lib/validations/landing-page-content"
import { adminClient } from "@/sanity/lib/admin-client"
import { sanityFetch } from "@/sanity/lib/live"
import { revalidatePath } from "next/cache"

const LANDING_PAGE_CONTENT_ID = 'landingPageContent'

// Ensure the document exists in Sanity
async function ensureDocumentExists() {
    try {
        const existing = await adminClient.getDocument(LANDING_PAGE_CONTENT_ID)
        if (existing) return existing
    } catch (error: any) {
        // Document doesn't exist, create it
        if (error.statusCode === 404) {
            console.log('Creating initial landingPageContent document...')
            const initialDoc = {
                _type: 'landingPageContent',
                _id: LANDING_PAGE_CONTENT_ID,
                // Minimal required fields - form will handle the rest
                hero: {
                    badge: '',
                    headingLines: [],
                    descriptionParagraphs: [],
                    ctaButtons: []
                },
                servicesPreview: { sectionHeading: { title: '' } },
                portfolioPreview: { sectionHeading: { title: '' } },
                aboutPreview: {
                    sectionHeading: { title: '' },
                    leftDescriptions: [
                        { text: '' },
                        { text: '' }
                    ],
                    rightDescriptions: [
                        { text: '' },
                        { text: '' }
                    ],
                    ctaText: '',
                    ctaUrl: ''
                },
                stats: {
                    projectsDelivered: { value: '', label: '', suffix: '' },
                    yearsExperience: { value: '', label: '', suffix: '' },
                    clientSatisfaction: { value: '', label: '', suffix: '' },
                },
                whyChooseUs: { sectionHeading: { title: '' } },
                blogPreview: { sectionHeading: { title: '' } },
                faqs: {
                    sectionHeading: { title: '' },
                    faqItems: []
                },
                serviceHighlightsMarquee: { highlights: [] },
                trustedByBrands: { sectionHeading: { title: '' }, brandLogos: [] },
                ourApproach: { sectionHeading: { title: '' }, steps: [] },
                caseStudiesPreview: { sectionHeading: { title: '' } },
                areasWeServe: { sectionHeading: { title: '' }, areas: [] },
                industriesWeServe: { sectionHeading: { title: '' }, industries: [] },
                testimonials: { sectionHeading: { title: '' }, testimonials: [] },
                leadership: {
                    sectionHeading: { title: '' },
                    founder: {
                        name: '',
                        role: '',
                        image: null,
                        socialLinks: []
                    },
                    agencyStructure: []
                },
                cta: {
                    badge: '',
                    heading: '',
                    description: '',
                    benefits: []
                }
            }
            return await adminClient.create(initialDoc)
        }
        throw error
    }
}

export async function getLandingPageContentForAdmin() {
    try {
        // Ensure document exists first
        await ensureDocumentExists()

        const query = `*[_type == "landingPageContent"][0] {
            ...,
            hero {
                ...,
                "featuredServices": featuredServices[]._ref
            },
            portfolioPreview {
                ...,
                "featuredProjects": featuredProjects[]._ref
            }
        }`
        const { data } = await sanityFetch({ query })
        return data
    } catch (error) {
        console.error("Failed to fetch landing page content:", error)
        return null
    }
}

export async function updateLandingPageContent(data: LandingPageContentValues) {
    try {
        const validatedFields = landingPageContentSchema.parse(data)


        const updateData: any = {
            _type: 'landingPageContent',
            _id: LANDING_PAGE_CONTENT_ID,
            hero: {
                ...validatedFields.hero,
                featuredServices: validatedFields.hero.featuredServices?.map(id => ({
                    _type: 'reference',
                    _ref: id,
                    _key: id
                }))
            },
            servicesPreview: validatedFields.servicesPreview,
            portfolioPreview: {
                ...validatedFields.portfolioPreview,
                featuredProjects: validatedFields.portfolioPreview.featuredProjects?.map(id => ({
                    _type: 'reference',
                    _ref: id,
                    _key: id
                }))
            },
            aboutPreview: validatedFields.aboutPreview,
            stats: validatedFields.stats,
            whyChooseUs: validatedFields.whyChooseUs,
            blogPreview: validatedFields.blogPreview,
            faqs: validatedFields.faqs,
            serviceHighlightsMarquee: validatedFields.serviceHighlightsMarquee,
            trustedByBrands: validatedFields.trustedByBrands,
            ourApproach: validatedFields.ourApproach,
            caseStudiesPreview: validatedFields.caseStudiesPreview,
            areasWeServe: validatedFields.areasWeServe,
            industriesWeServe: validatedFields.industriesWeServe,
            testimonials: validatedFields.testimonials,
            leadership: validatedFields.leadership,
            cta: {
                ...validatedFields.cta,
                formId: validatedFields.cta.formId ? {
                    _type: 'reference',
                    _ref: validatedFields.cta.formId
                } : undefined
            }
        }

        await adminClient.createOrReplace(updateData)

        // Clear Next.js cache
        revalidatePath('/admin/landing/page-content')

        return { success: true }

    } catch (error: any) {
        console.error("Failed to update landing page content:", error)
        const errorMessage = error.response?.body?.message || error.message || "Failed to update content"
        return {
            success: false,
            error: errorMessage
        }
    }
}

// Auto-save draft (partial data, no validation)
export async function saveLandingPageDraft(data: Partial<LandingPageContentValues>) {
    try {
        const updateData: any = {
            ...data,
            _type: 'landingPageContent',
            _id: `drafts.${LANDING_PAGE_CONTENT_ID}`,
        }

        if (updateData.hero?.featuredServices) {
            updateData.hero.featuredServices = updateData.hero.featuredServices.map((id: string) => ({
                _type: 'reference',
                _ref: id,
                _key: id
            }))
        }

        if (updateData.portfolioPreview?.featuredProjects) {
            updateData.portfolioPreview.featuredProjects = updateData.portfolioPreview.featuredProjects.map((id: string) => ({
                _type: 'reference',
                _ref: id,
                _key: id
            }))
        }

        // Normalize CTA formId to reference if it's a string
        if (updateData.cta && typeof updateData.cta.formId === 'string') {
            updateData.cta.formId = {
                _type: 'reference',
                _ref: updateData.cta.formId
            }
        }

        await adminClient.createOrReplace(updateData)

        console.log('Draft saved successfully at', new Date().toISOString())

        return { success: true }

    } catch (error: any) {
        console.error("Failed to save draft:", error)
        return {
            success: false,
            error: error.message || "Failed to save draft"
        }
    }
}

// Get draft version
export async function getLandingPageDraft() {
    try {
        const draft = await adminClient.getDocument(`drafts.${LANDING_PAGE_CONTENT_ID}`)
        if (draft) {
            if (draft.hero && Array.isArray(draft.hero.featuredServices)) {
                draft.hero.featuredServices = draft.hero.featuredServices.map((p: any) => p._ref || p)
            }
            if (draft.portfolioPreview && Array.isArray(draft.portfolioPreview.featuredProjects)) {
                draft.portfolioPreview.featuredProjects = draft.portfolioPreview.featuredProjects.map((p: any) => p._ref || p)
            }
            // Flatten CTA form reference
            if (draft.cta?.formId?._ref) {
                draft.cta.formId = draft.cta.formId._ref
            }
        }
        console.log('Draft fetched via getDocument:', draft ? 'Found' : 'Not found')
        return draft
    } catch (error: any) {
        if (error.statusCode === 404) {
            console.log('No draft found (404 - this is normal)')
            return null
        }
        console.error("Failed to fetch draft:", error)
        return null
    }
}

// Discard draft
export async function discardLandingPageDraft() {
    try {
        await adminClient.delete(`drafts.${LANDING_PAGE_CONTENT_ID}`)
        // Clear Next.js cache
        revalidatePath('/admin/landing/page-content')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to discard draft:", error)
        return {
            success: false,
            error: error.message || "Failed to discard draft"
        }
    }
}

export async function getServiceOptions() {
    try {
        const query = `*[_type == "service"] { _id, title }`
        const services = await adminClient.fetch(query)
        return services || []
    } catch (error) {
        console.error("Failed to fetch service options:", error)
        return []
    }
}

export async function getProjectOptions() {
    try {
        const query = `*[_type == "project"] { _id, title }`
        const projects = await adminClient.fetch(query)
        return projects || []
    } catch (error) {
        console.error("Failed to fetch project options:", error)
        return []
    }
}

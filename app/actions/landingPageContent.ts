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
                    badge: { en: '', ur: '', es: '', ar: '' },
                    headingLines: [],
                    descriptionParagraphs: [],
                    ctaButtons: []
                },
                servicesPreview: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } } },
                portfolioPreview: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } } },
                aboutPreview: {
                    sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } },
                    leftDescriptions: [
                        { text: { en: '', ur: '', es: '', ar: '' } },
                        { text: { en: '', ur: '', es: '', ar: '' } }
                    ],
                    rightDescriptions: [
                        { text: { en: '', ur: '', es: '', ar: '' } },
                        { text: { en: '', ur: '', es: '', ar: '' } }
                    ],
                    ctaText: { en: '', ur: '', es: '', ar: '' },
                    ctaUrl: { en: '', ur: '', es: '', ar: '' }
                },
                stats: {
                    projectsDelivered: { value: { en: '', ur: '', es: '', ar: '' }, label: { en: '', ur: '', es: '', ar: '' }, suffix: '' },
                    yearsExperience: { value: { en: '', ur: '', es: '', ar: '' }, label: { en: '', ur: '', es: '', ar: '' }, suffix: '' },
                    clientSatisfaction: { value: { en: '', ur: '', es: '', ar: '' }, label: { en: '', ur: '', es: '', ar: '' }, suffix: '' },
                },
                whyChooseUs: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } }, benefits: [] },
                blogPreview: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } } },
                faqs: {
                    sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } },
                    faqItems: []
                },
                serviceHighlightsMarquee: { highlights: [] },
                trustedByBrands: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } }, brandLogos: [] },
                ourApproach: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } }, steps: [] },
                caseStudiesPreview: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } } },
                areasWeServe: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } }, areas: [] },
                industriesWeServe: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } }, industries: [] },
                testimonials: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } }, testimonials: [] },
                leadership: {
                    sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } },
                    founder: {
                        name: { en: '', ur: '', es: '', ar: '' },
                        role: { en: '', ur: '', es: '', ar: '' },
                        image: null,
                        socialLinks: []
                    },
                    agencyStructure: []
                },
                cta: {
                    badge: { en: '', ur: '', es: '', ar: '' },
                    heading: { en: '', ur: '', es: '', ar: '' },
                    description: { en: '', ur: '', es: '', ar: '' },
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

        const query = `*[_type == "landingPageContent"][0]`
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
            hero: validatedFields.hero,
            servicesPreview: validatedFields.servicesPreview,
            portfolioPreview: validatedFields.portfolioPreview,
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

// Get draft version - USE getDocument instead of GROQ query!
export async function getLandingPageDraft() {
    try {
        // Use getDocument instead of fetch - GROQ queries don't work for drafts!
        const draft = await adminClient.getDocument(`drafts.${LANDING_PAGE_CONTENT_ID}`)

        console.log('Draft fetched via getDocument:', draft ? 'Found' : 'Not found')

        return draft
    } catch (error: any) {
        // getDocument throws error if document doesn't exist, which is normal
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

'use server'

import { globalSectionsSchema, GlobalSectionsValues } from "@/lib/validations/global-sections"
import { adminClient } from "@/sanity/lib/admin-client"
import { sanityFetch } from "@/sanity/lib/live"
import { revalidatePath } from "next/cache"

const GLOBAL_SECTIONS_ID = 'globalSections'
const LANDING_PAGE_CONTENT_ID = 'landingPageContent'

// Ensure the document exists in Sanity
export async function ensureGlobalSectionsDocExists() {
    try {
        const existing = await adminClient.getDocument(GLOBAL_SECTIONS_ID)
        if (existing) return existing
    } catch (error: any) {
        if (error.statusCode === 404) {
            console.log('Creating initial globalSections document...')
            const initialDoc = {
                _type: 'globalSections',
                _id: GLOBAL_SECTIONS_ID,
                stats: {
                    projectsDelivered: { value: '', label: { en: '', ur: '', es: '', ar: '' }, suffix: '' },
                    yearsExperience: { value: '', label: { en: '', ur: '', es: '', ar: '' }, suffix: '' },
                    clientSatisfaction: { value: '', label: { en: '', ur: '', es: '', ar: '' }, suffix: '' },
                },
                servicesPreview: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } } },
                whyChooseUs: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } }, benefits: [] },
                ourApproach: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } }, steps: [] },
                industriesWeServe: { sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } }, industries: [] },
                faqs: {
                    sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } },
                    faqItems: []
                },
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

export async function getGlobalSectionsForAdmin() {
    try {
        await ensureGlobalSectionsDocExists()
        const query = `*[_type == "globalSections" && _id == "${GLOBAL_SECTIONS_ID}"][0]`
        const { data } = await sanityFetch({ query })
        return data
    } catch (error) {
        console.error("Failed to fetch global sections:", error)
        return null
    }
}

export async function updateGlobalSections(data: GlobalSectionsValues) {
    try {
        const validatedFields = globalSectionsSchema.parse(data)

        const updateData: any = {
            _type: 'globalSections',
            _id: GLOBAL_SECTIONS_ID,
            stats: validatedFields.stats,
            servicesPreview: validatedFields.servicesPreview,
            whyChooseUs: validatedFields.whyChooseUs,
            ourApproach: validatedFields.ourApproach,
            industriesWeServe: validatedFields.industriesWeServe,
            faqs: validatedFields.faqs,
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
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to update global sections:", error)
        return {
            success: false,
            error: error.message || "Failed to update content"
        }
    }
}

// Migration Action
export async function migrateLandingToGlobal() {
    try {
        // 1. Fetch current landing page content
        const landingDoc = await adminClient.getDocument(LANDING_PAGE_CONTENT_ID)
        if (!landingDoc) {
            return { success: false, error: "Landing page document not found" }
        }

        // 2. Extract shared fields
        const sharedFields = {
            stats: landingDoc.stats,
            servicesPreview: landingDoc.servicesPreview,
            whyChooseUs: landingDoc.whyChooseUs,
            ourApproach: landingDoc.ourApproach,
            industriesWeServe: landingDoc.industriesWeServe,
            faqs: landingDoc.faqs,
            leadership: landingDoc.leadership,
            cta: landingDoc.cta,
        }

        // 3. Create/Update Global Sections document
        const globalDoc = {
            _type: 'globalSections',
            _id: GLOBAL_SECTIONS_ID,
            ...sharedFields
        }

        await adminClient.createOrReplace(globalDoc)
        console.log("Migration to Global Sections successful!")

        return { success: true }
    } catch (error: any) {
        console.error("Migration failed:", error)
        return { success: false, error: error.message || "Migration failed" }
    }
}

// Draft Actions
export async function saveGlobalSectionsDraft(data: Partial<GlobalSectionsValues>) {
    try {
        const updateData: any = {
            ...data,
            _type: 'globalSections',
            _id: `drafts.${GLOBAL_SECTIONS_ID}`,
        }

        // Normalize CTA formId to reference if it's a string
        if (updateData.cta && typeof updateData.cta.formId === 'string') {
            updateData.cta.formId = {
                _type: 'reference',
                _ref: updateData.cta.formId
            }
        }

        await adminClient.createOrReplace(updateData)
        return { success: true }
    } catch (error: any) {
        console.error("Failed to save draft:", error)
        return { success: false, error: error.message }
    }
}

export async function getGlobalSectionsDraft() {
    try {
        const draft = await adminClient.getDocument(`drafts.${GLOBAL_SECTIONS_ID}`)
        return draft
    } catch (error: any) {
        if (error.statusCode === 404) return null
        console.error("Failed to fetch draft:", error)
        return null
    }
}

export async function discardGlobalSectionsDraft() {
    try {
        await adminClient.delete(`drafts.${GLOBAL_SECTIONS_ID}`)
        return { success: true }
    } catch (error: any) {
        console.error("Failed to discard draft:", error)
        return { success: false, error: error.message }
    }
}

'use server'

import { aboutPageContentSchema, AboutPageContentValues } from "@/lib/validations/about-page-content"
import { adminClient } from "@/sanity/lib/admin-client"
import { sanityFetch } from "@/sanity/lib/live"
import { revalidatePath } from "next/cache"

const ABOUT_PAGE_CONTENT_ID = 'aboutPageContent'

// Ensure the document exists in Sanity
async function ensureDocumentExists() {
    try {
        const existing = await adminClient.getDocument(ABOUT_PAGE_CONTENT_ID)
        if (existing) return existing
    } catch (error: any) {
        if (error.statusCode === 404) {
            console.log('Creating initial aboutPageContent document...')
            const initialDoc = {
                _type: 'aboutPageContent',
                _id: ABOUT_PAGE_CONTENT_ID,
                hero: {
                    title: { en: '', ur: '', es: '', ar: '' },
                    subtitle: { en: '', ur: '', es: '', ar: '' },
                    description: { en: '', ur: '', es: '', ar: '' },
                },
                intro: {
                    badge: { en: '', ur: '', es: '', ar: '' },
                    heading: { en: '', ur: '', es: '', ar: '' },
                    description1: { en: '', ur: '', es: '', ar: '' },
                    description2: { en: '', ur: '', es: '', ar: '' },
                    sinceYear: new Date().getFullYear()
                },
                missionVision: {
                    sectionHeading: {
                        eyebrow: { en: 'What Drives Us', ur: '', es: '', ar: '' },
                        title: { en: 'Our Purpose & Direction', ur: '', es: '', ar: '' }
                    },
                    mission: {
                        eyebrow: { en: 'Purpose', ur: '', es: '', ar: '' },
                        title: { en: 'Our Mission', ur: '', es: '', ar: '' },
                        description1: { en: '', ur: '', es: '', ar: '' },
                        keyPoints: []
                    },
                    vision: {
                        eyebrow: { en: 'Direction', ur: '', es: '', ar: '' },
                        title: { en: 'Our Vision', ur: '', es: '', ar: '' },
                        description1: { en: '', ur: '', es: '', ar: '' },
                        keyPoints: []
                    }
                },
                philosophy: {
                    sectionHeading: {
                        eyebrow: { en: 'Our Philosophy', ur: '', es: '', ar: '' },
                        title: { en: 'Strategy Before Design', ur: '', es: '', ar: '' }
                    },
                    quoteBlock: { en: '', ur: '', es: '', ar: '' },
                    description1: { en: '', ur: '', es: '', ar: '' },
                    description2: { en: '', ur: '', es: '', ar: '' },
                    steps: []
                },
                globalReach: {
                    badge: { en: '', ur: '', es: '', ar: '' },
                    heading: { en: '', ur: '', es: '', ar: '' },
                    description1: { en: '', ur: '', es: '', ar: '' },
                    description2: { en: '', ur: '', es: '', ar: '' },
                    regions: [],
                    stats: []
                },
                culture: {
                    sectionHeading: { title: { en: '', ur: '', es: '', ar: '' } },
                    values: []
                }
            }
            return await adminClient.create(initialDoc)
        }
        throw error
    }
}

export async function getAboutPageContentForAdmin() {
    try {
        await ensureDocumentExists()
        const query = `*[_type == "aboutPageContent"][0]`
        const { data } = await sanityFetch({ query })
        return data
    } catch (error) {
        console.error("Failed to fetch about page content:", error)
        return null
    }
}

export async function updateAboutPageContent(data: AboutPageContentValues) {
    try {
        const validatedFields = aboutPageContentSchema.parse(data)

        const updateData: any = {
            _type: 'aboutPageContent',
            _id: ABOUT_PAGE_CONTENT_ID,
            hero: validatedFields.hero,
            intro: validatedFields.intro,
            missionVision: validatedFields.missionVision,
            philosophy: validatedFields.philosophy,
            globalReach: validatedFields.globalReach,
            culture: validatedFields.culture
        }

        await adminClient.createOrReplace(updateData)
        revalidatePath('/admin/about/page-content')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to update about page content:", error)
        const errorMessage = error.response?.body?.message || error.message || "Failed to update content"
        return { success: false, error: errorMessage }
    }
}

export async function saveAboutPageDraft(data: Partial<AboutPageContentValues>) {
    try {
        const updateData: any = {
            ...data,
            _type: 'aboutPageContent',
            _id: `drafts.${ABOUT_PAGE_CONTENT_ID}`,
        }
        await adminClient.createOrReplace(updateData)
        return { success: true }
    } catch (error: any) {
        console.error("Failed to save draft:", error)
        return { success: false, error: error.message || "Failed to save draft" }
    }
}

export async function getAboutPageDraft() {
    try {
        const draft = await adminClient.getDocument(`drafts.${ABOUT_PAGE_CONTENT_ID}`)
        return draft
    } catch (error: any) {
        if (error.statusCode === 404) return null
        console.error("Failed to fetch draft:", error)
        return null
    }
}

export async function discardAboutPageDraft() {
    try {
        await adminClient.delete(`drafts.${ABOUT_PAGE_CONTENT_ID}`)
        revalidatePath('/admin/about/page-content')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to discard draft:", error)
        return { success: false, error: error.message || "Failed to discard draft" }
    }
}

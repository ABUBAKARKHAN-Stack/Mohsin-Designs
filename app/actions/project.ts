'use server'

import { adminClient } from "@/sanity/lib/admin-client"
import { revalidatePath } from "next/cache"
import { projectSchema, ProjectValues } from "@/lib/validations/project"

export async function getDashboardProjects() {
    try {
        const query = `*[_type == "project"] | order(_updatedAt desc) {
            _id,
            "title": title.en,
            "description": description.en,
            "slug": slug.current,
            "mainImage": coalesce(mainImage.asset->url, mainImage.url, null),
            _updatedAt
        }`

        const data = await adminClient.fetch(query, {}, {
            perspective: "raw",
            useCdn: false
        })

        const projectMap = new Map<string, any>()

        data.forEach((project: any) => {
            const isDraft = project._id.startsWith('drafts.')
            const baseId = project._id.replace(/^(drafts\.)+/, '');

            if (!projectMap.has(baseId)) {
                projectMap.set(baseId, {
                    ...project,
                    _id: baseId,
                    _originalId: project._id,
                    status: isDraft ? 'Draft' : 'Published'
                })
            } else {
                const existing = projectMap.get(baseId)
                if (isDraft) {
                    projectMap.set(baseId, {
                        ...project,
                        _id: baseId,
                        _originalId: baseId,
                        status: 'Draft',
                        hasPublished: true
                    })
                } else {
                    projectMap.set(baseId, {
                        ...existing,
                        status: 'Draft',
                        hasPublished: true
                    })
                }
            }
        })

        return Array.from(projectMap.values())
    } catch (error) {
        console.error("Failed to fetch dashboard projects:", error)
        return []
    }
}

export async function getProjectById(id: string) {
    try {
        const query = `*[_type == "project" && (_id == $id || _id == "drafts." + $id)] | order(_updatedAt desc)[0] {
            _id,
            _type,
            title,
            category,
            description,
            tags,
            "slug": { "current": slug.current },
            "mainImage": select(
                mainImage.asset != null => {
                    "asset": mainImage.asset,
                    "url": mainImage.asset->url,
                    "_id": mainImage.asset->._id
                },
                null
            ),
            "caseStudy": {
                "title": caseStudy.title,
                "testimonial": caseStudy.testimonial,
                "beforeImage": select(
                    caseStudy.beforeImage.asset != null => {
                        "asset": caseStudy.beforeImage.asset,
                        "url": caseStudy.beforeImage.asset->url,
                        "_id": caseStudy.beforeImage.asset->._id
                    },
                    null
                ),
                "afterImage": select(
                    caseStudy.afterImage.asset != null => {
                        "asset": caseStudy.afterImage.asset,
                        "url": caseStudy.afterImage.asset->url,
                        "_id": caseStudy.afterImage.asset->._id
                    },
                    null
                ),
                "results": caseStudy.results[] {
                    _key,
                    icon,
                    value,
                    label
                }
            }
        }`
        const result = await adminClient.fetch(query, { id }, {
            perspective: "raw",
            useCdn: false
        })

        if (result && result.tags) {
            result.tags = {
                en: Array.isArray(result.tags.en) ? result.tags.en.join(", ") : (result.tags.en || ""),
                ur: Array.isArray(result.tags.ur) ? result.tags.ur.join(", ") : (result.tags.ur || ""),
                es: Array.isArray(result.tags.es) ? result.tags.es.join(", ") : (result.tags.es || ""),
                ar: Array.isArray(result.tags.ar) ? result.tags.ar.join(", ") : (result.tags.ar || "")
            }
        }

        return result
    } catch (error) {
        console.error("Failed to fetch project:", error)
        return null
    }
}

export async function createProject(data: ProjectValues, id?: string) {
    try {
        const validated = projectSchema.parse(data)

        const doc: any = {
            _type: 'project',
            title: validated.title,
            slug: {
                _type: 'slug',
                current: validated.slug.current
            },
            description: validated.description,
            category: validated.category,
            tags: validated.tags ? {
                en: validated.tags.en?.split(',').map(t => t.trim()).filter(Boolean) || [],
                ur: validated.tags.ur?.split(',').map(t => t.trim()).filter(Boolean) || [],
                es: validated.tags.es?.split(',').map(t => t.trim()).filter(Boolean) || [],
                ar: validated.tags.ar?.split(',').map(t => t.trim()).filter(Boolean) || []
            } : undefined,
            mainImage: validated.mainImage?._id ? {
                _type: 'image',
                asset: { _type: 'reference', _ref: validated.mainImage._id }
            } : undefined,
            caseStudy: validated.caseStudy ? {
                title: validated.caseStudy.title,
                beforeImage: validated.caseStudy.beforeImage?._id ? {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: validated.caseStudy.beforeImage._id }
                } : undefined,
                afterImage: validated.caseStudy.afterImage?._id ? {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: validated.caseStudy.afterImage._id }
                } : undefined,
                testimonial: validated.caseStudy.testimonial,
                results: validated.caseStudy.results?.map(res => ({
                    _key: res._key || Math.random().toString(36).substring(2, 9),
                    icon: res.icon,
                    value: res.value,
                    label: res.label
                }))
            } : undefined
        }

        if (id) {
            const docWithId = { ...doc, _id: id }
            const result = await adminClient.createOrReplace(docWithId)
            await adminClient.delete(`drafts.${id}`).catch(() => { })
            revalidatePath('/admin/portfolio')
            return { success: true, id: result._id }
        } else {
            const result = await adminClient.create(doc)
            revalidatePath('/admin/portfolio')
            return { success: true, id: result._id }
        }
    } catch (error: any) {
        console.error("Failed to create project:", error)
        return { success: false, error: error.message }
    }
}

export async function updateProject(id: string, data: ProjectValues) {
    try {
        const validated = projectSchema.parse(data)

        const toSet: any = {
            title: validated.title,
            slug: {
                _type: 'slug',
                current: validated.slug.current
            },
            description: validated.description,
            category: validated.category,
            tags: {
                en: validated.tags.en?.split(',').map(t => t.trim()).filter(Boolean) || [],
                ur: validated.tags.ur?.split(',').map(t => t.trim()).filter(Boolean) || [],
                es: validated.tags.es?.split(',').map(t => t.trim()).filter(Boolean) || [],
                ar: validated.tags.ar?.split(',').map(t => t.trim()).filter(Boolean) || []
            },
            caseStudy: {
                title: validated.caseStudy.title,
                testimonial: validated.caseStudy.testimonial,
                results: validated.caseStudy.results?.map(res => ({
                    _key: res._key || Math.random().toString(36).substring(2, 9),
                    icon: res.icon,
                    value: res.value,
                    label: res.label
                }))
            }
        }

        // Handle images within the caseStudy object
        if (validated.caseStudy.beforeImage?._id) {
            toSet.caseStudy.beforeImage = {
                _type: 'image',
                asset: { _type: 'reference', _ref: validated.caseStudy.beforeImage._id }
            }
        }
        if (validated.caseStudy.afterImage?._id) {
            toSet.caseStudy.afterImage = {
                _type: 'image',
                asset: { _type: 'reference', _ref: validated.caseStudy.afterImage._id }
            }
        }

        const toUnset = []

        if (validated.mainImage?._id) {
            toSet.mainImage = {
                _type: 'image',
                asset: { _type: 'reference', _ref: validated.mainImage._id }
            }
        } else {
            toUnset.push('mainImage')
        }

        const patch = adminClient.patch(id).set(toSet)
        if (toUnset.length > 0) patch.unset(toUnset)
        await patch.commit()

        await adminClient.delete(`drafts.${id}`).catch(() => { })

        revalidatePath('/admin/portfolio')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to update project:", error)
        return { success: false, error: error.message }
    }
}

export async function deleteProject(id: string) {
    try {
        await adminClient.delete(id)
        await adminClient.delete(`drafts.${id}`).catch(() => { })
        revalidatePath('/admin/portfolio')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to delete project:", error)
        return { success: false, error: error.message }
    }
}
export async function deleteProjects(ids: string[]) {
    try {
        const transaction = adminClient.transaction()
        ids.forEach(id => {
            transaction.delete(id)
            transaction.delete(`drafts.${id}`)
        })
        await transaction.commit()
        revalidatePath('/admin/portfolio')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to delete projects:", error)
        return { success: false, error: error.message }
    }
}

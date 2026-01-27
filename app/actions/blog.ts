'use server'

import { adminClient } from "@/sanity/lib/admin-client"
import { revalidatePath } from "next/cache"
import { blogPostSchema, BlogPostValues } from "@/lib/validations/blog"

export async function getDashboardPosts() {
    try {
        const query = `*[_type == "post"] | order(_updatedAt desc) {
            _id,
            "title": title.en,  
            "description": description.en,
            "slug": select(
                slug.current != null => slug.current,
                _id
            ),
            featured,
            publishedAt,
            author,
            "location": location->title,
            "service": service->{"title": title.en},
            "mainImage": coalesce(mainImage.asset->url, mainImage.url, null),
            readTime,
            _updatedAt
        }`

        const data = await adminClient.fetch(query, {}, {
            perspective: "raw",
            useCdn: false
        })

        // Post-process to merge drafts and published docs
        const postMap = new Map<string, any>()

        data.forEach((post: any) => {
            const isDraft = post._id.startsWith('drafts.')
            // Robustly strip ALL leading "drafts." occurrences
            const baseId = post._id.replace(/^(drafts\.)+/, '');

            // Ensure slug is a string (it should be from projection, but spread might bring raw object)
            const slugString = typeof post.slug === 'string' ? post.slug : post.slug?.current || baseId

            if (!postMap.has(baseId)) {
                postMap.set(baseId, {
                    ...post,
                    _id: baseId,
                    _originalId: post._id,
                    slug: slugString,
                    status: isDraft ? 'Draft' : 'Published'
                })
            } else {
                const existing = postMap.get(baseId)
                if (isDraft) {
                    postMap.set(baseId, {
                        ...post,
                        _id: baseId,
                        _originalId: baseId,
                        slug: slugString,
                        status: 'Draft',
                        hasPublished: true
                    })
                } else {
                    postMap.set(baseId, {
                        ...existing,
                        status: 'Draft',
                        hasPublished: true
                    })
                }
            }
        })

        return Array.from(postMap.values())
    } catch (error) {
        console.error("Failed to fetch dashboard posts:", error)
        return []
    }
}

export async function getPostById(id: string) {
    try {
        const query = `*[_type == "post" && (_id == $id || _id == "drafts." + $id)] | order(_updatedAt desc)[0] {
            _id,
            _type,
            title,
            description,
            featured,
            "slug": { "current": slug.current },
            readTime,
            author,
            tags,
            "location": location._ref,
            "service": service._ref,
            "categories": coalesce(categories[]._ref, []),
            publishedAt,
            "mainImage": select(
                mainImage.asset != null => {
                    "asset": mainImage.asset,
                    "url": mainImage.asset->url,
                    "_id": mainImage.asset->._id
                },
                null
            ),
            body
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
        console.error("Failed to fetch post:", error)
        return null
    }
}

export async function getPostForView(id: string) {
    try {
        const query = `*[_type == "post" && (_id == $id || _id == "drafts." + $id)] | order(_updatedAt desc)[0] {
            _id,
            title,
            description,
            "slug": slug.current,
            author,
            "location": location->title,
            publishedAt,
            featured,
            readTime,
            "service": service->{"title": title.en},
            "categories": categories[]->title,
            "mainImageUrl": mainImage.asset->url,
            body,
            _updatedAt
        }`
        const result = await adminClient.fetch(query, { id }, {
            perspective: "raw",
            useCdn: false
        })
        return result
    } catch (error) {
        console.error("Failed to fetch post for view:", error)
        return null
    }
}

export async function getBlogFormOptions() {
    try {
        const servicesQuery = `*[_type == "service"] { _id, "title": title.en }`
        const categoriesQuery = `*[_type == "category"] { _id, "title": title.en }`
        const locationsQuery = `*[_type == "location"] { _id, title }`

        const [services, categories, locations] = await Promise.all([
            adminClient.fetch(servicesQuery),
            adminClient.fetch(categoriesQuery),
            adminClient.fetch(locationsQuery)
        ])

        return {
            services: services || [],
            categories: categories || [],
            locations: locations || []
        }
    } catch (error) {
        console.error("Failed to fetch form options:", error)
        return { services: [], categories: [], locations: [] }
    }
}

export async function createPost(data: BlogPostValues, id?: string) {
    try {
        const validated = blogPostSchema.parse(data)

        const doc = {
            _type: 'post',
            _id: id,
            title: validated.title,
            description: validated.description,
            featured: validated.featured,
            slug: {
                _type: 'slug',
                current: validated.slug.current
            },
            readTime: validated.readTime,
            author: validated.author,
            tags: {
                en: validated.tags.en?.split(',').map(t => t.trim()).filter(Boolean) || [],
                ur: validated.tags.ur?.split(',').map(t => t.trim()).filter(Boolean) || [],
                es: validated.tags.es?.split(',').map(t => t.trim()).filter(Boolean) || [],
                ar: validated.tags.ar?.split(',').map(t => t.trim()).filter(Boolean) || []
            },
            location: (validated.location && validated.location !== 'none') ? { _type: 'reference', _ref: validated.location } : undefined,
            publishedAt: validated.publishedAt,
            service: (validated.service && validated.service !== 'none') ? { _type: 'reference', _ref: validated.service } : undefined,
            categories: (validated.categories && validated.categories.length > 0)
                ? validated.categories.map(catId => ({ _type: 'reference', _ref: catId, _key: catId }))
                : [],
            mainImage: validated.mainImage?._id ? {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: validated.mainImage._id
                }
            } : undefined,
            body: validated.body
        }

        if (id) {
            const docWithId = { ...doc, _id: id }
            const result = await adminClient.createOrReplace(docWithId)
            // Delete draft after publishing
            await adminClient.delete(`drafts.${id}`).catch(() => { })
            revalidatePath('/admin/blogs')
            return { success: true, id: result._id }
        } else {
            const result = await adminClient.create(doc)
            revalidatePath('/admin/blogs')
            return { success: true, id: result._id }
        }
    } catch (error: any) {
        console.error("Failed to create post:", error)
        return { success: false, error: error.message }
    }
}

export async function updatePost(id: string, data: BlogPostValues) {
    try {
        const validated = blogPostSchema.parse(data)

        const toSet: any = {
            title: validated.title,
            description: validated.description,
            featured: validated.featured,
            slug: {
                _type: 'slug',
                current: validated.slug.current
            },
            readTime: validated.readTime,
            author: validated.author,
            tags: {
                en: validated.tags.en?.split(',').map(t => t.trim()).filter(Boolean) || [],
                ur: validated.tags.ur?.split(',').map(t => t.trim()).filter(Boolean) || [],
                es: validated.tags.es?.split(',').map(t => t.trim()).filter(Boolean) || [],
                ar: validated.tags.ar?.split(',').map(t => t.trim()).filter(Boolean) || []
            },
            publishedAt: validated.publishedAt,
            categories: (validated.categories && validated.categories.length > 0)
                ? validated.categories.map(catId => ({ _type: 'reference', _ref: catId, _key: catId }))
                : [],
            body: validated.body,
        }

        const toUnset = []

        if (validated.location && validated.location !== 'none') {
            toSet.location = { _type: 'reference', _ref: validated.location }
        } else {
            toUnset.push('location')
        }

        if (validated.service && validated.service !== 'none') {
            toSet.service = { _type: 'reference', _ref: validated.service }
        } else {
            toUnset.push('service')
        }

        if (validated.mainImage?._id) {
            toSet.mainImage = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: validated.mainImage._id
                }
            }
        } else {
            toUnset.push('mainImage')
        }

        const patch = adminClient.patch(id).set(toSet)
        if (toUnset.length > 0) patch.unset(toUnset)
        await patch.commit()

        await adminClient.delete(`drafts.${id}`).catch(() => { })

        revalidatePath('/admin/blogs')
        revalidatePath(`/admin/blogs/${id}`)
        return { success: true }
    } catch (error: any) {
        console.error("Failed to update post:", error)
        return { success: false, error: error.message }
    }
}

export async function deletePost(id: string) {
    try {
        await adminClient.delete(id)
        // Also delete draft if exists
        await adminClient.delete(`drafts.${id}`).catch(() => { })

        revalidatePath('/admin/blogs')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to delete post:", error)
        return { success: false, error: error.message }
    }
}

export async function deleteMultiplePosts(ids: string[]) {
    try {
        const transactions = ids.flatMap(id => [
            adminClient.delete(id),
            adminClient.delete(`drafts.${id}`).catch(() => { })
        ])
        await Promise.all(transactions)
        revalidatePath('/admin/blogs')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to delete multiple posts:", error)
        return { success: false, error: error.message }
    }
}

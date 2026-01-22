'use server'

import { adminClient } from "@/sanity/lib/admin-client"
import { sanityFetch } from "@/sanity/lib/live"
import { revalidatePath } from "next/cache"
import { blogPostSchema, BlogPostValues } from "@/lib/validations/blog"

export async function getPosts() {
    try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            publishedAt,
            author,
            location,
            "service": service->{title},
            "mainImage": mainImage.asset->url
        }`
        const { data } = await sanityFetch({ query })
        return data || []
    } catch (error) {
        console.error("Failed to fetch posts:", error)
        return []
    }
}

export async function getPostById(id: string) {
    try {
        const query = `*[_type == "post" && _id == $id][0] {
            _id,
            title,
            "slug": slug.current,
            author,
            location,
            publishedAt,
            "service": service._ref,
            "categories": categories[]->_id,
            mainImage,
            body
        }`
        const { data } = await sanityFetch({ query, params: { id } })
        return data
    } catch (error) {
        console.error("Failed to fetch post:", error)
        return null
    }
}

export async function getBlogFormOptions() {
    try {
        const servicesQuery = `*[_type == "service"] { _id, "title": title.en }`
        const categoriesQuery = `*[_type == "category"] { _id, title }`

        const [services, categories] = await Promise.all([
            sanityFetch({ query: servicesQuery }),
            sanityFetch({ query: categoriesQuery })
        ])

        return {
            services: services.data || [],
            categories: categories.data || []
        }
    } catch (error) {
        console.error("Failed to fetch form options:", error)
        return { services: [], categories: [] }
    }
}

export async function createPost(data: BlogPostValues) {
    try {
        const validated = blogPostSchema.parse(data)

        const doc = {
            _type: 'post',
            title: validated.title,
            slug: {
                _type: 'slug',
                current: validated.slug.current
            },
            author: validated.author,
            location: validated.location,
            publishedAt: validated.publishedAt,
            service: validated.service ? { _type: 'reference', _ref: validated.service } : undefined,
            categories: validated.categories?.map(id => ({ _type: 'reference', _ref: id, _key: id })),
            mainImage: validated.mainImage,
            body: validated.body
        }

        const result = await adminClient.create(doc)
        revalidatePath('/admin/blogs')
        return { success: true, id: result._id }
    } catch (error: any) {
        console.error("Failed to create post:", error)
        return { success: false, error: error.message }
    }
}

export async function updatePost(id: string, data: BlogPostValues) {
    try {
        const validated = blogPostSchema.parse(data)

        const doc = {
            title: validated.title,
            slug: {
                _type: 'slug',
                current: validated.slug.current
            },
            author: validated.author,
            location: validated.location,
            publishedAt: validated.publishedAt,
            service: validated.service ? { _type: 'reference', _ref: validated.service } : undefined,
            categories: validated.categories?.map(id => ({ _type: 'reference', _ref: id, _key: id })),
            mainImage: validated.mainImage,
            body: validated.body
        }

        await adminClient.patch(id).set(doc).commit()
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
        revalidatePath('/admin/blogs')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to delete post:", error)
        return { success: false, error: error.message }
    }
}

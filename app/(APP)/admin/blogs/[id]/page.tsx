import { BlogForm } from "@/components/admin/blogs/BlogForm"
import { getBlogFormOptions, getPostById } from "@/app/actions/blog"
import { notFound } from "next/navigation"

interface EditBlogPageProps {
    params: {
        id: string
    }
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
    const [post, { services, categories }] = await Promise.all([
        getPostById(params.id),
        getBlogFormOptions()
    ])

    if (!post) {
        notFound()
    }

    return (
        <div className="container mx-auto pb-10 max-w-5xl">
            <BlogForm initialData={post} services={services} categories={categories} />
        </div>
    )
}

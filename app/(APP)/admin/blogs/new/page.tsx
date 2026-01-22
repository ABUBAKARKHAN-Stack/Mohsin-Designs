import { BlogForm } from "@/components/admin/blogs/BlogForm"
import { getBlogFormOptions } from "@/app/actions/blog"

export default async function NewBlogPage() {
    const { services, categories } = await getBlogFormOptions()

    return (
        <div className="container mx-auto pb-10 max-w-5xl">
            <BlogForm services={services} categories={categories} />
        </div>
    )
}

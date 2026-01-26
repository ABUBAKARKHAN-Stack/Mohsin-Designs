import { BlogPost } from "@/types/blog.types";

const blogPosts: any[] = [
    {
        _id: "1",
        title: "The Future of Digital Branding in 2025",
        slug: { current: "the-future-of-digital-branding-in-2025" },
        excerpt: "Exploring emerging trends and technologies that will shape how brands connect with their audiences.",
        category: "Insights",
        date: "Dec 2024",
        readTime: "8 min",
        service: { title: "Logo Design", slug: { current: "logo-design" } },
        location: "Abu Dhabi",
        mainImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    },
    {
        _id: "2",
        title: "Designing for Impact: Creating Memorable User Experiences",
        slug: { current: "designing-for-impact" },
        excerpt: "How thoughtful design choices can transform ordinary interactions into extraordinary moments.",
        category: "Design",
        date: "Nov 2024",
        readTime: "6 min",
        service: { title: "App Design", slug: { current: "app-design" } },
        location: "Abu Dhabi",
        mainImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
    },
    {
        _id: "3",
        title: "Building Brands That Last: A Strategic Approach",
        slug: { current: "building-brands-that-last" },
        excerpt: "The essential elements of brand building that stand the test of time.",
        category: "Strategy",
        date: "Oct 2024",
        location: "Abu Dhabi",
        readTime: "5 min",
        mainImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
    },
];

export {
    blogPosts
}
"use client"
import { motion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import Link from "next/link";
import { ContainerLayout } from "@/components/layout";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Digital Branding in 2025",
    excerpt: "Exploring emerging trends and technologies that will shape how brands connect with their audiences.",
    category: "Insights",
    date: "Dec 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Designing for Impact: Creating Memorable User Experiences",
    excerpt: "How thoughtful design choices can transform ordinary interactions into extraordinary moments.",
    category: "Design",
    date: "Nov 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Building Brands That Last: A Strategic Approach",
    excerpt: "The essential elements of brand building that stand the test of time.",
    category: "Strategy",
    date: "Oct 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
  },
];

const BlogPreview = () => {
  return (
    <section className="lg:py-12.5 py-6.25 bg-background relative overflow-hidden">

      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />

      <ContainerLayout className=" relative z-10">
        <SectionHeading
          eyebrow="Latest Insights"
          title="From the Journal"
          description="Thoughts, ideas, and perspectives on design, technology, and building brands that matter."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href="/blog">
                {/* Image */}
                <div className="aspect-16/12 overflow-hidden mb-6 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-widest mb-3">
                  <span className="text-accent">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold tracking-tight group-hover:text-accent transition-colors mb-3 line-clamp-1">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest group-hover:text-accent transition-colors">
                    Read{" "}
                    <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link href="/blog" className="inline-flex items-center gap-3 group">
            <span className="text-sm uppercase tracking-widest group-hover:text-accent transition-colors">
              View All Articles
            </span>
            <span className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all duration-300">
              <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default BlogPreview;

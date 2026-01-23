"use client"
import { motion } from "motion/react";
import { ArrowUpRight, Clock, User } from "lucide-react";
import { useState } from "react";
import PageHero from "@/components/ui/page-hero";
import { ContainerLayout, PageWrapper } from "@/components/layout";

const featuredPost = {
  id: 1,
  title: "The Future of Digital Branding in 2025",
  excerpt: "Exploring emerging trends and technologies that will shape how brands connect with their audiences in the coming year.",
  category: "Insights",
  date: "Dec 2024",
  readTime: "8 min read",
  author: "Alex Morgan",
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop",
};

const posts = [
  {
    id: 2,
    title: "Designing for Impact: Creating Memorable User Experiences",
    excerpt: "How thoughtful design choices can transform ordinary interactions into extraordinary moments.",
    category: "Design",
    date: "Nov 2024",
    readTime: "6 min read",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Building Brands That Last: A Strategic Approach",
    excerpt: "The essential elements of brand building that stand the test of time.",
    category: "Strategy",
    date: "Oct 2024",
    readTime: "5 min read",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "The Art of Motion Design in Web Experiences",
    excerpt: "Why animation and motion are crucial for creating engaging digital products.",
    category: "Development",
    date: "Sep 2024",
    readTime: "7 min read",
    author: "Emily Park",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Sustainable Design: The New Standard",
    excerpt: "How eco-conscious design practices are shaping the future of digital products.",
    category: "Insights",
    date: "Aug 2024",
    readTime: "6 min read",
    author: "David Kim",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Typography Trends: Beyond the Basics",
    excerpt: "Exploring bold typographic choices that are defining modern web design.",
    category: "Design",
    date: "Jul 2024",
    readTime: "4 min read",
    author: "Lisa Thompson",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
  },
];

const categories = ["All", "Insights", "Design", "Strategy", "Development"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <PageWrapper>
      <PageHero
        title="Journal"
        subtitle="Insights & Stories"
        description="Insights, stories, and perspectives from our team on design, technology, and digital strategy."
        breadcrumbs={[{ label: "Journal" }]}
      />

      <section className="pb-32">
        <ContainerLayout>
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 text-sm uppercase tracking-widest border transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group cursor-pointer mb-24"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 px-4 py-1 bg-accent text-accent-foreground text-xs uppercase tracking-widest">
                  Featured
                </div>
              </div>
              <div className="lg:pl-8">
                <div className="flex items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest mb-4">
                  <span className="text-accent">{featuredPost.category}</span>
                  <span>·</span>
                  <span>{featuredPost.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight group-hover:text-accent transition-colors mb-6">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <div className="mt-8">
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest group-hover:text-accent transition-colors">
                    Read article <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Divider */}
          <div className="border-t border-border mb-16" />

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/12] overflow-hidden mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest mb-3">
                  <span className="text-accent">{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-display font-bold tracking-tight group-hover:text-accent transition-colors mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest group-hover:text-accent transition-colors">
                    Read <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button className="px-8 py-4 border border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 uppercase tracking-widest text-sm">
              Load More Articles
            </button>
          </motion.div>
        </ContainerLayout>
      </section>
    </PageWrapper>
  );
};

export default Blog;

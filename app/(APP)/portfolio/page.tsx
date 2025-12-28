"use client"

import PageHero from "@/components/ui/page-hero";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ContainerLayout } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";

const categories = ["All", "Brand", "Digital", "Product"];
const projects = [
  { id: 1, slug: "meridian", title: "Meridian", category: "Brand", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop" },
  { id: 2, slug: "pulse", title: "Pulse", category: "Digital", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop" },
  { id: 3, slug: "vertex", title: "Vertex", category: "Product", image: "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&h=600&fit=crop" },
  { id: 4, slug: "horizon", title: "Horizon", category: "Brand", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop" },
  { id: 5, slug: "nova", title: "Nova", category: "Digital", image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop" },
  { id: 6, slug: "apex", title: "Apex", category: "Product", image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&h=600&fit=crop" },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <PageHero
        title="Our work"
        subtitle="Portfolio"
        description="A showcase of our best projects across brand, digital, and product design."
        breadcrumbs={[{ label: "Work" }]}
      />

      <section className="pb-32">
        <ContainerLayout>
          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mb-16 flex-wrap"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 text-sm uppercase tracking-widest font-medium border transition-all duration-300 ${
                  filter === cat
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border hover:border-accent hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className="aspect-4/3 relative overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      fill
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-display font-bold tracking-tight group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-widest">{project.category}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </ContainerLayout>
      </section>
    </>
  );
};

export default Portfolio;

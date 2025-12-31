"use client"

import { motion } from "framer-motion";
import { Lightbulb, MessageSquare, Award, Handshake, Target, Layers } from "lucide-react";
import SplitText from "@/components/ui/split-text";
import { ContainerLayout } from "@/components/layout";
import SectionHeading from "@/components/ui/section-heading";

const reasons = [
  {
    icon: Lightbulb,
    title: "Creativity Grounded in Strategy",
    description: "Every design decision is backed by thoughtful strategy. We understand your brand's purpose, audience, and positioning before creating visuals.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description: "Clear project scopes, direct access to senior team members, regular updates, and transparent decision-making throughout the process.",
  },
  {
    icon: Award,
    title: "Quality Without Compromise",
    description: "We deliver efficiently without cutting corners. Every project goes through structured review and refinement to ensure consistency and integrity.",
  },
  {
    icon: Handshake,
    title: "Built on Reliability & Trust",
    description: "We deliver what's promised, respect timelines, stay honest in recommendations, and stand behind our work as an extension of your team.",
  },
  {
    icon: Target,
    title: "Design That Communicates",
    description: "Great design should do more than look good — it should tell a story, create trust, and guide users effortlessly with clear visual hierarchy.",
  },
  {
    icon: Layers,
    title: "Integrated Agency Model",
    description: "We handle branding, design, development, and growth services together, ensuring consistent messaging, unified identity, and faster execution.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="lg:py-12.5 py-6.25 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />

      <ContainerLayout className="relative">

        <SectionHeading
          splitText
          align="center"
          title="Why choose Mohsin Designs"
          eyebrow="why us"
          description="Choosing the right creative agency is about finding a partner who understands your business,respects your vision, and knows how to translate ideas into results."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-sm border border-border bg-card hover:border-accent/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />

              <div className="relative">
                <motion.div
                  className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <reason.icon className="w-6 h-6 text-accent" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ContainerLayout>
    </section>
  );
};

export default WhyChooseUs;

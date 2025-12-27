"use client"

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/ui/section-heading";
import { faqs } from "@/constants/contact&help.constants";
import { ArrowRight } from "lucide-react";
import { ContainerLayout } from "@/components/layout";


const FAQs = () => {
  return (
    <section className="py-28 lg:py-32 bg-secondary/1">
      <ContainerLayout>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <SectionHeading
              eyebrow="FAQs"
              title="Questions? We've got answers"
              align="left"
            />
            <p className="text-muted-foreground mt-6 max-w-md">
              Everything you need to know about working with us. Can't find what you're looking for? Feel free to reach out.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 mt-8 text-accent font-medium hover:underline"
            >
              Contact us for more
              <ArrowRight className="size-4" />
            </motion.a>
          </motion.div>

          {/* Right side - Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-border bg-background px-6 data-[state=open]:bg-card"
                  >
                    <AccordionTrigger className="text-left font-display font-medium text-lg hover:text-accent hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default FAQs;

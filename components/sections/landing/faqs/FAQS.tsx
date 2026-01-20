"use client"

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/ui/section-heading";
import { faqs as defaultFaqs } from "@/constants/contact-and-help.constants";
import { ArrowRight } from "lucide-react";
import { ContainerLayout } from "@/components/layout";
import { useGlobalContent } from "@/context/GlobalContentContext";
import { useParams } from "next/navigation";
import { uiT } from "@/i18n";
import Link from "next/link";


const FAQs = () => {
  const { globalContent } = useGlobalContent();
  const { lang }: any = useParams();

  const faqsData = globalContent?.faqs;
  const faqItems = faqsData?.faqItems || defaultFaqs;

  return (
    <section className="lg:py-12.5 py-6.25  bg-secondary/1">
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
              eyebrow={faqsData?.sectionHeading?.eyebrow || "FAQs"}
              title={faqsData?.sectionHeading?.title || "Frequently Asked Questions"}
              align="left"
            />
            <p className="text-muted-foreground mt-6 max-w-md">
              {faqsData?.sectionHeading?.description || "Everything you need to know about working with us. Can't find what you're looking for? Feel free to reach out."}
            </p>
            <motion.div
              whileHover={{ x: 5 }}
              className="inline-block mt-8"
            >
              <Link
                href={faqsData?.buttonUrl || `/${lang}/contact`}
                className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
              >
                {faqsData?.buttonText || "Contact us for more"}
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}

                    className="border! border-border bg-background px-6 data-[state=open]:bg-card"
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

"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import MagneticButton from "@/components/MagneticButton";
import { BorderBeam } from "@/components/ui/border-beam";
import { ContainerLayout } from "@/components/layout";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormType, contactSchema } from "@/schemas/contact.schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import DecorativeElements from "./DecorativeElements";

const CTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

 


  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      message: "",
      name: "",
      subject: ""
    }
  })

  const {
    isLoading,
    isSubmitting,
    isSubmitted
  } = form.formState

  const onSubmit = (data: ContactFormType) => { }


  const fieldBaseClass = "bg-primary-foreground/5! border-primary-foreground/10! text-primary-foreground! placeholder:text-primary-foreground/40! focus:border-accent! h-12 rounded-xl"

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">

      <DecorativeElements
      scrollYProgress={scrollYProgress}
      y={y}
      />

      <ContainerLayout className=" relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >

            <div className="inline-flex relative items-center gap-2 px-4 py-2 bg-card/10 border border-card/20 rounded-full mb-6 ">
              <span className="w-2 h-2 rounded-full bg-card animate-pulse" />
              <span className="text-sm font-medium text-card">Available for new projects</span>
              <BorderBeam className="from-card/60 via-card to-transparent"
                duration={6}
              />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight mb-6">
              Ready to Start Your{" "}
              <span className="text-accent">Next Project?</span>
            </h2>

            <div className="text-primary-foreground/70 text-lg leading-relaxed mb-8 max-w-lg space-y-4">
              <p>
                If you’re looking for a creative agency that combines clarity, creativity, and accountability, we’d love to collaborate.
              </p>
              <p>
                Whether you’re building a brand from the ground up or refining an existing presence, we approach every project with the same commitment to quality and purpose.
              </p>
            </div>

            {/* Quick benefits */}
            <div className="space-y-3">
              {[
                "Free initial consultation",
                "Response within 24 hours",
                "No commitment required",
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-primary-foreground/80"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-background/5 backdrop-blur-md border border-primary-foreground/10 rounded-3xl p-6 md:p-8">
              <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Send className="w-5 h-5 text-accent-foreground" />
                </span>
                Send us a message
              </h3>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FieldGroup>

                    <div className="grid md:grid-cols-2 gap-4">

                      <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">
                              Name *
                            </FieldLabel>
                            <Input
                              {...field}
                              id="name"
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter your name"
                              className={fieldBaseClass}
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">
                              Email *
                            </FieldLabel>
                            <Input
                              {...field}
                              id="email"
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter your email"
                              className={fieldBaseClass}
                              autoComplete="off"


                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="subject"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="subject">
                            Subject *
                          </FieldLabel>
                          <Input
                            {...field}
                            id="subject"
                            aria-invalid={fieldState.invalid}
                            placeholder="Project inquiry"
                            className={fieldBaseClass}
                            autoComplete="off"


                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="message"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="message">
                            Message *
                          </FieldLabel>
                          <Textarea
                            {...field}
                            id="message"
                            aria-invalid={fieldState.invalid}
                            placeholder="Tell us about your project..."
                            rows={5}
                            className={cn(
                              fieldBaseClass,
                              "resize-none"
                            )}
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />


                    <MagneticButton strength={0.05} className="w-full">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold text-sm group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                          />
                        ) : (
                          <>
                            Start Your Project
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </MagneticButton>
                  </FieldGroup>


                </form>
              
            </div>
          </motion.div>
          
        </div>
      </ContainerLayout>
    </section>
  );
};
export default CTA;

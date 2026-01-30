"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import PageHero from "@/components/ui/page-hero"
import { ContainerLayout, PageWrapper } from "@/components/layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SectionHeading from "@/components/ui/section-heading"
import { submitDynamicForm } from "@/app/actions/formActions"
import { errorToast, successToast } from "@/lib/toastNotifications"

interface ContactClientProps {
    pageData: any
    siteSettings: any
}

export default function ContactClient({ pageData, siteSettings }: ContactClientProps) {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState<Record<string, any>>({})

    const hero = pageData?.hero || {}
    const contactForm = pageData?.contactForm || {}
    const formConfig = contactForm?.form || null
    const faqs = pageData?.faqs || {}
    const faqItems = faqs?.faqItems || []

    const contact = siteSettings?.contact || {}
    const social = siteSettings?.social || {}

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: contact.email || "hello@studio.agency",
            href: contact.email ? `mailto:${contact.email}` : "mailto:hello@studio.agency",
            color: "group-hover:bg-accent/20",
        },
        {
            icon: Phone,
            label: "Phone",
            value: contact.phone || "+1 (555) 123-4567",
            href: contact.phone ? `tel:${contact.phone.replace(/\s+/g, '')}` : "tel:+15551234567",
            color: "group-hover:bg-accent/20",
        },
        {
            icon: MapPin,
            label: "Location",
            value: contact.address || "New York, NY",
            href: null,
            color: "group-hover:bg-accent/20",
        },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formConfig?._id) {
            errorToast("Form configuration missing")
            return
        }

        // Basic validation for required fields
        const newErrors: Record<string, string> = {}
        formConfig.fields?.forEach((field: any) => {
            if (field.required && !formData[field.fieldName]) {
                const label = field.label || field.fieldName
                newErrors[field.fieldName] = `${label} is required`
            }
        })

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        try {
            const result = await submitDynamicForm(formConfig._id, formData)
            if (result.success) {
                setSubmitted(true)
                successToast(result.message || "Message sent successfully")
            } else {
                errorToast(result.error || "Failed to send message")
            }
        } catch (error) {
            errorToast("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    const t = (val: any) => val || ""

    return (
        <PageWrapper>
            <PageHero
                title={t(hero.title) || "Let's talk"}
                subtitle={t(hero.subtitle) || "Get in Touch"}
                description={t(hero.description) || "Have a project in mind? We'd love to hear about it."}
                breadcrumbs={[{ label: "Contact" }]}
            />

            <section className="pb-32">
                <ContainerLayout>
                    <div className="grid lg:grid-cols-2 gap-20">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="group"
                                    >
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="flex items-center gap-5 p-6 border border-border hover:border-accent/50 transition-all duration-300 bg-card"
                                            >
                                                <div className={`w-14 h-14 rounded-full border border-border flex items-center justify-center ${item.color} transition-all duration-300`}>
                                                    <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                                                </div>
                                                <div>
                                                    <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-1">
                                                        {item.label}
                                                    </span>
                                                    <p className="text-xl font-medium group-hover:text-accent transition-colors">
                                                        {item.value}
                                                    </p>
                                                </div>
                                                <ArrowUpRight className="ml-auto h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-5 p-6 border border-border bg-card">
                                                <div className={`w-14 h-14 rounded-full border border-border flex items-center justify-center ${item.color} transition-all duration-300`}>
                                                    <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                                                </div>
                                                <div>
                                                    <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-1">
                                                        {item.label}
                                                    </span>
                                                    <p className="text-xl font-medium">{item.value}</p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-card p-8 md:p-12 border border-border relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl" />

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-16"
                                >
                                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10 text-accent" />
                                    </div>
                                    <h3 className="text-3xl font-display font-bold mb-4">{t(formConfig?.successMessage) || "Thank you!"}</h3>
                                    <p className="text-muted-foreground mb-8 max-w-sm">
                                        Your message has been received. We'll get back to you soon.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSubmitted(false)
                                            setFormData({})
                                        }}
                                    >
                                        Send another message
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-display font-bold mb-2">{t(contactForm.formHeading) || "Send us a message"}</h3>
                                        <p className="text-muted-foreground">{t(contactForm.formDescription) || "Fill out the form below."}</p>
                                    </div>

                                    {formConfig?.fields?.map((field: any) => (
                                        <div key={field.fieldName}>
                                            <label className="text-sm uppercase tracking-widest text-muted-foreground block mb-3">
                                                {t(field.label)} {field.required && "*"}
                                            </label>
                                            {field.fieldType === 'textarea' ? (
                                                <Textarea
                                                    name={field.fieldName}
                                                    value={formData[field.fieldName] || ""}
                                                    onChange={handleChange}
                                                    placeholder={field.placeholder || ""}
                                                    rows={5}
                                                    className={`border-0 border-b rounded-none px-0 focus-visible:ring-0 resize-none bg-transparent transition-colors ${errors[field.fieldName] ? 'border-destructive' : 'border-border focus-visible:border-accent'
                                                        }`}
                                                />
                                            ) : (
                                                <Input
                                                    name={field.fieldName}
                                                    type={field.fieldType || 'text'}
                                                    value={formData[field.fieldName] || ""}
                                                    onChange={handleChange}
                                                    placeholder={field.placeholder || ""}
                                                    className={`border-0 border-b rounded-none px-0 focus-visible:ring-0 bg-transparent transition-colors ${errors[field.fieldName] ? 'border-destructive' : 'border-border focus-visible:border-accent'
                                                        }`}
                                                />
                                            )}
                                            {errors[field.fieldName] && <p className="text-sm text-destructive mt-2">{errors[field.fieldName]}</p>}
                                        </div>
                                    ))}

                                    <Button
                                        type="submit"
                                        className="w-full md:w-auto px-12 bg-accent text-accent-foreground hover:bg-accent/90 group"
                                        disabled={loading || !formConfig}
                                    >
                                        {loading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full mr-2"
                                                />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                {t(formConfig?.submitButtonText) || "Send Message"}
                                                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </ContainerLayout>

                {/* FAQs Section */}
                {faqItems.length > 0 && (
                    <section className="lg:py-12.5 py-6.25 bg-secondary/1 mt-32">
                        <ContainerLayout>
                            <div className="grid lg:grid-cols-2 gap-16 items-start">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="lg:sticky lg:top-32"
                                >
                                    <SectionHeading
                                        eyebrow={t(faqs.sectionHeading?.eyebrow) || "FAQs"}
                                        title={t(faqs.sectionHeading?.title) || "Frequently Asked Questions"}
                                        align="left"
                                    />
                                    <p className="text-muted-foreground mt-6 max-w-md">
                                        {t(faqs.sectionHeading?.description) || "Everything you need to know about working with us."}
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <Accordion type="single" collapsible className="space-y-4">
                                        {faqItems.map((faq: any, index: number) => (
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
                                                        {t(faq.question)}
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                                        {t(faq.answer)}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </motion.div>
                                        ))}
                                    </Accordion>
                                </motion.div>
                            </div>
                        </ContainerLayout>
                    </section>
                )}
            </section>
        </PageWrapper>
    )
}

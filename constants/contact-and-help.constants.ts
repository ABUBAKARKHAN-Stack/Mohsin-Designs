import { Mail, MapPin, Phone } from "lucide-react";

const faqs = [
  {
    question: "What services does Mohsin Designs offer?",
    answer: "We offer a full range of creative and digital services, including logo design, brand identity, logo animation, web design and development, mobile app development, SEO services, and Google Ads management. Our services are designed to work together as a unified system rather than standalone solutions.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines depend on scope and complexity. Branding and design projects follow a structured process that allows time for research, concept development, refinement, and delivery. We always provide clear timelines before work begins.",
  },
  {
    question: "Do you work with startups as well as established businesses?",
    answer: "Yes. We work with startups building their first brand foundation, growing businesses refining their positioning, and established companies modernizing their digital presence. Our process adapts to the stage and needs of the business.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer: "Absolutely. Many clients continue working with us for ongoing support, updates, optimization, and future expansion. We believe strong brands evolve, and we’re here to support that growth.",
  },
  {
    question: "Can you work with clients remotely?",
    answer: "Yes. We collaborate with clients globally using structured communication tools and clearly defined workflows. Remote collaboration allows us to deliver the same level of quality regardless of location.",
  },
  {
    question: "What makes Mohsin Designs different from other agencies?",
    answer: "Our difference lies in how we think. We combine strategic clarity with creative execution and maintain close collaboration throughout the process. Clients don’t get handed off between departments — they work with a focused, senior-led team that understands the full picture.",
  },
];

const contactInfo = {
  mail: "hello@mohsindesigns.com"
}

const detailedContactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@studio.agency",
    href: "mailto:hello@studio.agency",
    color: "group-hover:bg-accent/20",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    color: "group-hover:bg-accent/20",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "New York, NY",
    href: null,
    color: "group-hover:bg-accent/20",
  },
];

const contactFormFields = [
  {
    type: "text",
    label: "Name *",

  },
   {
    type: "email",
    label: "Email *",

  },
   {
    type: "text",
    label: "Subject *",
  },
   {
    type: "text",
    label: "Message ",

  },
]

export {
  faqs,
  contactInfo,
  detailedContactInfo,
  contactFormFields
}
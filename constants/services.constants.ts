import { Code, HeartHandshake, Lightbulb, MessageSquare, Palette, Play, Rocket, Search, Smartphone, Target, TrendingUp, Users } from "lucide-react";

const serviceItems = [
  { name: "Logo Design", path: "/services/logo-design", desc: "Custom brand identity" },
  { name: "Logo Animation", path: "/services/logo-animation", desc: "Motion graphics & intros" },
  { name: "SEO Services", path: "/services/seo-services", desc: "Search optimization" },
  { name: "Google Ads", path: "/services/google-ads", desc: "Paid advertising" },
  { name: "Web Development", path: "/services/web-development", desc: "Custom websites" },
  { name: "App Development", path: "/services/app-development", desc: "iOS & Android apps" },
];


const coreServices = [
  "Brand Strategy",
  "Logo & Brand Identity",
  "Graphic Design",
  "Website Design & Development",
  "SEO & Google Ads Marketing",
  "Logo Animation & Motion Graphics"
];


const services = [
  {
    number: "01",
    title: "Logo Design",
    description: "Creating distinctive logos that define your brand identity and make a lasting impression.",
    features: ["Custom Logo Creation", "Brand Mark Design", "Typography Selection", "Color Palette", "Logo Variations"],
    icon: Palette,
    image: "/assets/services/logo-design.jpg",
    path: "/services/logo-design",
  },
  {
    number: "02",
    title: "Logo Animation",
    description: "Bringing your logo to life with captivating motion graphics and dynamic animations.",
    features: ["Intro Animations", "Social Media Assets", "Video Intros", "Motion Graphics", "Brand Reveals"],
    icon: Play,
    image: "/assets/services/logo-animation.jpg",
    path: "/services/logo-animation",
  },
  {
    number: "03",
    title: "SEO Services",
    description: "Boosting your visibility in search results to drive organic traffic and growth.",
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Content Optimization", "Link Building"],
    icon: Search,
    image: "/assets/services/seo-services.jpg",
    path: "/services/seo-services",
  },
  {
    number: "04",
    title: "Google Ads",
    description: "Strategic advertising campaigns that drive targeted traffic and maximize ROI.",
    features: ["Campaign Strategy", "Ad Creation", "Bid Management", "Conversion Tracking", "Performance Reports"],
    icon: Target,
    image: "/assets/services/google-ads.jpg",
    path: "/services/google-ads",

  },
  {
    number: "05",
    title: "Web Development",
    description: "Building modern, high-performance websites that deliver exceptional user experiences.",
    features: ["Custom Websites", "E-commerce", "CMS Integration", "Responsive Design", "Performance Optimization"],
    icon: Code,
    image: "/assets/services/web-development.jpg",
    path: "/services/web-development",
  },
  {
    number: "06",
    title: "App Development",
    description: "Creating powerful mobile applications for iOS and Android platforms.",
    features: ["iOS Apps", "Android Apps", "Cross-Platform", "UI/UX Design", "App Maintenance"],
    icon: Smartphone,
    image: "/assets/services/app-development.jpg",
    path: "/services/app-development",
  },
];


const processSteps = [
  {
    icon: MessageSquare,
    title: "Discovery Call",
    description: "We start with a conversation to understand your business, goals, and vision for success.",
    duration: "Day 1",
  },
  {
    icon: Lightbulb,
    title: "Strategy & Planning",
    description: "Our team develops a tailored strategy and roadmap aligned with your objectives.",
    duration: "Week 1",
  },
  {
    icon: Palette,
    title: "Design & Concept",
    description: "We create stunning designs and concepts for your approval before development.",
    duration: "Week 2-3",
  },
  {
    icon: Code,
    title: "Development",
    description: "Our experts bring your vision to life with clean, efficient, and scalable solutions.",
    duration: "Week 3-6",
  },
  {
    icon: Rocket,
    title: "Launch & Deploy",
    description: "We ensure a smooth launch with thorough testing and seamless deployment.",
    duration: "Week 6-7",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Support",
    description: "We provide continued support, maintenance, and optimization for lasting success.",
    duration: "Ongoing",
  },
];

// Why Choose Us
const benefits = [
  {
    icon: Target,
    title: "Results-Driven Approach",
    description: "Every decision is backed by data and focused on achieving measurable outcomes.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Work with a consistent team that understands your brand inside and out.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description: "We don't just deliver—we iterate and optimize based on real-world performance.",
  },
];




export {
  serviceItems,
  coreServices,
  services,
  processSteps,
  benefits
}
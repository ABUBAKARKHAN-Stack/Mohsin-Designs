import { Code, Palette, Play, Search, Smartphone, Target } from "lucide-react";

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


const servicesPreview = [
  {
    number: "01",
    title: "Logo Design",
    description: "Creating distinctive logos that define your brand identity and make a lasting impression.",
    features: ["Custom Logos", "Brand Marks", "Visual Identity"],
    icon: Palette,
    image: "/assets/services/logo-design.jpg",
    path: "/services/logo-design",
  },
  {
    number: "02",
    title: "Logo Animation",
    description: "Bringing your logo to life with captivating motion graphics and dynamic animations.",
    features: ["Intro Animations", "Motion Graphics", "Brand Reveals"],
    icon: Play,
    image: "/assets/services/logo-animation.jpg",
    path: "/services/logo-animation",
  },
  {
    number: "03",
    title: "SEO Services",
    description: "Boosting your visibility in search results to drive organic traffic and growth.",
    features: ["Keyword Research", "On-Page SEO", "Technical SEO"],
    icon: Search,
    image: "/assets/services/seo-services.jpg",
    path: "/services/seo-services",
  },
  {
    number: "04",
    title: "Google Ads",
    description: "Strategic advertising campaigns that drive targeted traffic and maximize ROI.",
    features: ["Campaign Strategy", "Ad Creation", "Performance Tracking"],
    icon: Target,
    image: "/assets/services/google-ads.jpg",
    path: "/services/google-ads",

  },
  {
    number: "05",
    title: "Web Development",
    description: "Building modern, high-performance websites that deliver exceptional user experiences.",
    features: ["Custom Websites", "E-commerce", "CMS Integration"],
    icon: Code,
    image: "/assets/services/web-development.jpg",
    path: "/services/web-development",
  },
  {
    number: "06",
    title: "App Development",
    description: "Creating powerful mobile applications for iOS and Android platforms.",
    features: ["iOS Apps", "Android Apps", "Cross-Platform"],
    icon: Smartphone,
    image: "/assets/services/app-development.jpg",
    path: "/services/app-development",
  },
];



export {
  serviceItems,
  coreServices,
  servicesPreview
}
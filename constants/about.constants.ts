import { Award, Clock, Shield, TrendingUp, Users, Zap } from "lucide-react";

const trustedBrands = [
  { name: "Adams Repipe & Plumbing", logo: "/assets/brands/adams-repipe.jpg" },
  { name: "All Star Exteriors", logo: "/assets/brands/all-star-exteriors.jpg" },
  { name: "American Stone Sealer", logo: "/assets/brands/american-stone-sealer.jpg" },
  { name: "Burks Wood Milling", logo: "/assets/brands/burks-wood-milling.jpg" },
  { name: "Cooper Land Management", logo: "/assets/brands/cooper-land-management.jpg" },
  { name: "Desert Performance Part", logo: "/assets/brands/desert-performance.jpg" },
  { name: "Precision Gutters", logo: "/assets/brands/precision-gutters.jpg" },
  { name: "Raised Up Youth", logo: "/assets/brands/raised-up-youth.jpg" },
  { name: "Redtail Roofing", logo: "/assets/brands/redtail-roofing.jpg" },
];

const reasons = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "We deliver projects on time without compromising quality. Our agile approach ensures rapid iteration.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and 99.9% uptime guarantee. Your data and users are always protected.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "We treat your business as our own. Direct communication with senior team members throughout.",
  },
  {
    icon: TrendingUp,
    title: "Results Driven",
    description: "Our solutions are designed to drive measurable business outcomes and sustainable growth.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized globally for excellence in design and development. 50+ industry awards.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock support and maintenance. We're here whenever you need us.",
  },
];


export {
    trustedBrands,
    reasons
}
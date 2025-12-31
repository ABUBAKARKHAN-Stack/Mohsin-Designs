import { Eye, MousePointerClick, TrendingUp } from "lucide-react";

const projects = [
  {
    id: 1,
    slug: "meridian",
    title: "Meridian",
    category: "Brand",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    caseStudy: null,
  },
  {
    id: 2,
    slug: "pulse",
    title: "Pulse",
    category: "Digital",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
    caseStudy: null,
  },
  {
    id: 3,
    slug: "horizon",
    title: "Horizon",
    category: "Brand",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop",
    caseStudy: {
      id: 1,
      title: "Redtail Roofing",
      category: "Brand Identity + Web",
      beforeImage: "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=800&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
      results: [
        { icon: TrendingUp, value: "+340%", label: "Organic Traffic" },
        { icon: MousePointerClick, value: "2.5x", label: "Lead Conversion" },
      ],
      testimonial: "Mohsin Designs completely transformed our online presence.",
      slug: "redtail-roofing",
    }
  },
  {
    id: 4,
    slug: "nova",
    title: "Nova",
    category: "Digital",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
    caseStudy: {
        id: 2,
        title: "Adams Repipe",
        category: "Website + SEO",
        beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
        results: [
          { icon: Eye, value: "15K+", label: "Monthly Visitors" },
          { icon: TrendingUp, value: "+280%", label: "Revenue Growth" },
        ],
        testimonial: "The results exceeded our expectations in every way.",
        slug: "adams-repipe",
      },
  },
  {
    id: 5,
    slug: "apex",
    title: "Apex",
    category: "Product",
    image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&h=600&fit=crop",
    caseStudy: {
        id: 3,
        title: "Desert Performance",
        category: "Full Rebrand",
        beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop",
        results: [
          { icon: TrendingUp, value: "+425%", label: "Brand Recognition" },
          { icon: MousePointerClick, value: "3x", label: "Customer Inquiries" },
        ],
        testimonial: "They understood our vision and brought it to life.",
        slug: "desert-performance",
      },
  },
];

export { projects };

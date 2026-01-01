import { Briefcase, Building2, Car, Globe, GraduationCap, Home, MapPin, ShoppingBag, Stethoscope, Utensils } from "lucide-react";

const stats = [
    { value: 8, suffix: "+", label: "Industries" },
    { value: 6, suffix: "+", label: "Years Experience" },
    { value: 3000, suffix: "+", label: "Projects Delivered" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
] as const


const areas = [
    {
        region: "North America",
        locations: ["United States", "Canada", "Mexico"],
        icon: Globe,
        featured: true,
        clients: 120,
        flag: "🇺🇸",
    },
    {
        region: "Europe",
        locations: ["United Kingdom", "Germany", "France", "Netherlands"],
        icon: Building2,
        featured: false,
        clients: 85,
        flag: "🇬🇧",
    },
    {
        region: "Middle East",
        locations: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
        icon: MapPin,
        featured: true,
        clients: 65,
        flag: "🇦🇪",
    },
    {
        region: "Asia Pacific",
        locations: ["Australia", "Singapore", "India", "Japan"],
        icon: Globe,
        featured: false,
        clients: 95,
        flag: "🇦🇺",
    },
];

const industries = [
    {
        name: "Real Estate",
        description: "Property listings, virtual tours & lead generation",
        icon: Home,
        projects: "50+",
    },
    {
        name: "Healthcare",
        description: "HIPAA-compliant solutions for medical practices",
        icon: Stethoscope,
        projects: "35+",
    },
    {
        name: "E-Commerce",
        description: "Online stores that convert visitors to customers",
        icon: ShoppingBag,
        projects: "80+",
    },
    {
        name: "Education",
        description: "Learning platforms & school management systems",
        icon: GraduationCap,
        projects: "25+",
    },
    {
        name: "Restaurant & Food",
        description: "Online ordering, menus & reservation systems",
        icon: Utensils,
        projects: "45+",
    },
    {
        name: "Construction",
        description: "Project showcases & contractor websites",
        icon: Building2,
        projects: "60+",
    },
    {
        name: "Automotive",
        description: "Dealerships, service centers & auto parts",
        icon: Car,
        projects: "30+",
    },
    {
        name: "Professional Services",
        description: "Law firms, consultants & agencies",
        icon: Briefcase,
        projects: "70+",
    },
];
export {
    stats,
    areas,
    industries
}
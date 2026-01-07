import { ServiceData } from "@/types/services.types";



export const servicesData: Record<string, ServiceData> = {
  "logo-design": {
    number: "01",
    title: "Logo Design",
    subtitle: "Create Your Unique Identity",
    description: "Creating distinctive logos that define your brand identity and make a lasting impression.",
    heroImage: '/assets/services/logo-design.jpg',

    introTitle: "Why a Custom Logo is Vital for Your Business",
    introContent: "When it comes to branding, a logo is often the first thing your customers notice. In today's competitive market, a strong, memorable logo can make all the difference in creating a lasting first impression. With businesses competing in diverse sectors, including real estate, hospitality, retail, and technology, your logo plays a critical role in standing out from the crowd and building brand recognition.",

    roleTitle: "The Role of a Logo in Building Brand Identity",
    roleContent: [
      "Your logo is much more than a graphic. It represents your brand's personality, values, and the quality of your products or services. In a competitive market where businesses are constantly evolving, having a logo that connects with your audience is essential.",
      "A well-designed logo creates trust, instills confidence, and communicates professionalism to your target audience. Your logo is often the first point of contact with potential customers, and first impressions count.",
      "Whether you're a new business or an established company looking to refresh your brand, a custom logo helps set the tone for how your audience perceives you. It's not just about aesthetics; it's about creating a visual identity that aligns with your business vision and mission."
    ],

    howWeHelpTitle: "How Our Logo Design Services Help Your Business Stand Out",
    howWeHelpPoints: [
      {
        title: "Tailored Designs",
        description: "We design logos that are customized to your business's unique personality. Whether you're in the luxury sector, a vibrant retail business, or a service provider, your logo will reflect your niche and audience."
      },
      {
        title: "Cultural Sensitivity",
        description: "We ensure that the logos we create are sensitive to local values while appealing to global tastes. We consider culture, design trends, and business customs in the creation process."
      },
      {
        title: "Simplicity with Impact",
        description: "A logo should be easy to recognize and understand. We focus on creating logos that are both simple and powerful, using appropriate colors, fonts, and graphics that make an impact while remaining memorable."
      }
    ],

    overview: "Your logo is the cornerstone of your brand identity. We craft custom logos that capture your essence, communicate your values, and stand out in a crowded marketplace.",
    items: ["Custom Logo Creation", "Brand Mark Design", "Typography Selection", "Color Palette", "Logo Variations", "Brand Guidelines"],

    benefits: [
      "Distinctive visual identity",
      "Professional brand perception",
      "Memorable first impression",
      "Versatile across all media",
      "Timeless design approach"
    ],

    whyChooseUsPoints: [
      {
        title: "Expert Designers",
        description: "Our team has extensive experience working with businesses across various industries. We understand the market and create logos tailored to your business's needs."
      },
      {
        title: "Creative Approach",
        description: "We use a creative approach to design that ensures your logo is unique and memorable, setting you apart from competitors."
      },
      {
        title: "Collaborative Process",
        description: "We believe in collaboration. Our design process involves constant feedback, ensuring the final logo meets your expectations."
      },
      {
        title: "Timely Delivery",
        description: "We understand the importance of deadlines and ensure that your logo is delivered on time without compromising on quality."
      }
    ],

    process: [
      { step: "01", title: "Discovery", desc: "Understanding your brand vision, values, and goals through in-depth consultation" },
      { step: "02", title: "Research", desc: "Analyzing industry trends, competitors, and your target audience" },
      { step: "03", title: "Concepts", desc: "Multiple creative directions crafted to reflect your brand's identity" },
      { step: "04", title: "Refinement", desc: "Perfecting the chosen direction with your feedback" },
      { step: "05", title: "Delivery", desc: "Final files in all required formats with brand guidelines" },
    ],

    industries: [
      { name: "Real Estate", description: "Elegant logos that evoke trust, luxury, and exclusivity for property businesses." },
      { name: "Hospitality & Tourism", description: "Warm, inviting designs that communicate world-class service and experiences." },
      { name: "Retail & E-commerce", description: "Memorable logos that connect with customers both online and in-store." },
      { name: "Tech & Startups", description: "Modern, sleek designs that communicate innovation and forward-thinking." },
      { name: "Healthcare", description: "Professional logos that build trust and convey care and expertise." },
      { name: "Finance & Legal", description: "Sophisticated designs that represent stability and credibility." }
    ],

    caseStudies: [
      {
        title: "Luxury Real Estate Company",
        problem: "The client was struggling to differentiate themselves in a highly competitive real estate market. Their existing logo was generic and did not reflect the high-end nature of their properties.",
        solution: "We developed a modern, elegant logo incorporating sleek lines and an iconic symbol of sophistication. Gold and dark blue colors evoked luxury, while clean typography reflected professionalism.",
        result: "After the logo launch, the company experienced a 50% increase in client inquiries within the first quarter. The new logo improved brand recognition and positioned them as market leaders."
      },
      {
        title: "Local Restaurant Rebrand",
        problem: "The restaurant's outdated logo failed to communicate the uniqueness of its menu and atmosphere. They struggled to attract customers who missed the chance to discover their offerings.",
        solution: "We designed a vibrant, modern logo featuring fusion elements reflecting the restaurant's cuisine. Bold, approachable fonts with warm colors evoked the flavor and warmth of the dishes.",
        result: "The restaurant saw a noticeable increase in foot traffic and online bookings. The fresh design resonated with both local and international visitors, creating a cohesive brand experience."
      },
      {
        title: "Tech Startup Launch",
        problem: "A new technology startup needed a logo that would establish credibility and appeal to investors while also connecting with their target user base.",
        solution: "We created a minimalist yet distinctive logo that balanced innovation with approachability. The geometric design suggested precision and cutting-edge technology.",
        result: "The startup successfully raised funding and the logo became instantly recognizable in their industry, helping establish a strong market presence from day one."
      }
    ],

    areas: [
      {
        region: "North America",
        locations: ["United States", "Canada", "Mexico"],
        featured: true,
        clients: 120,
        flag: "🇺🇸",
      },
      {
        region: "Europe",
        locations: ["United Kingdom", "Germany", "France", "Netherlands"],
        featured: false,
        clients: 85,
        flag: "🇬🇧",
      },
      {
        region: "Middle East",
        locations: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
        featured: true,
        clients: 65,
        flag: "🇦🇪",
      },
      {
        region: "Asia Pacific",
        locations: ["Australia", "Singapore", "India", "Japan"],
        featured: false,
        clients: 95,
        flag: "🇦🇺",
      },
    ],

    faqs: [
      {
        question: "How much does a custom logo design cost?",
        answer: "The cost varies depending on the complexity of the project and the number of revisions required. We offer affordable pricing packages tailored to different business needs. Contact us for a detailed quote."
      },
      {
        question: "Will I receive multiple logo concepts to choose from?",
        answer: "Yes, we provide multiple logo concepts for you to review. You can select the design that best reflects your brand, and we'll work with you to refine it until you're completely satisfied."
      },
      {
        question: "Do you offer logo redesign services?",
        answer: "Absolutely! We specialize in redesigning logos to better reflect your evolving brand identity. Whether you need a complete overhaul or a slight update, we can help refresh your logo to stay relevant."
      },
      {
        question: "What file formats will I receive?",
        answer: "You'll receive your logo in multiple file types, including AI, PNG, JPG, SVG, and PDF, ensuring it's ready for both online and offline use across all platforms."
      },
      {
        question: "How long does the design process take?",
        answer: "Typically, the logo design process takes 2-4 weeks from initial consultation to final delivery, depending on the complexity and number of revision rounds needed."
      }
    ]
  },

  "logo-animation": {
    number: "02",
    title: "Logo Animation",
    subtitle: "Bring Your Brand to Life",
    description: "Bringing your logo to life with captivating motion graphics and dynamic animations.",
    heroImage: '/assets/services/logo-animation.jpg',

    introTitle: "Why Animated Logos Are Essential in Today's Digital World",
    introContent: "In an era where video content dominates social media and digital platforms, static logos are no longer enough to capture attention. An animated logo transforms your brand identity into a dynamic, memorable experience that engages viewers and leaves a lasting impression across all digital touchpoints.",

    roleTitle: "The Power of Motion in Brand Recognition",
    roleContent: [
      "Motion naturally draws the human eye. An animated logo leverages this psychological principle to ensure your brand gets noticed in crowded digital spaces, from social media feeds to video intros.",
      "Animation adds personality and emotion to your brand. The way your logo moves tells a story about your company's character—whether it's playful, professional, innovative, or elegant.",
      "Animated logos are versatile assets that work across multiple platforms: website headers, social media content, video productions, presentations, and digital advertisements."
    ],

    howWeHelpTitle: "How Our Logo Animation Services Elevate Your Brand",
    howWeHelpPoints: [
      {
        title: "Custom Motion Design",
        description: "Every animation is crafted specifically for your brand, ensuring the movement style reflects your company's personality and resonates with your target audience."
      },
      {
        title: "Platform Optimization",
        description: "We create multiple versions optimized for different platforms—from quick social media loops to full cinematic intros for video content."
      },
      {
        title: "Seamless Integration",
        description: "Our animations are designed to work seamlessly with your existing brand assets, maintaining consistency across all touchpoints."
      }
    ],

    overview: "Static logos are just the beginning. We create stunning logo animations that captivate your audience, enhance brand recognition, and make your content more engaging across digital platforms.",
    items: ["Intro Animations", "Social Media Assets", "Video Intros", "Motion Graphics", "Brand Reveals", "Loading Animations"],

    benefits: [
      "Enhanced brand recognition",
      "Professional video content",
      "Social media ready assets",
      "Increased engagement",
      "Modern brand perception"
    ],

    whyChooseUsPoints: [
      {
        title: "Motion Expertise",
        description: "Our animators specialize in bringing static designs to life with smooth, professional motion that captivates viewers."
      },
      {
        title: "Quick Turnaround",
        description: "We understand the pace of digital marketing and deliver animations efficiently without compromising quality."
      },
      {
        title: "Format Flexibility",
        description: "We provide animations in all formats you need—MP4, GIF, MOV, and more—optimized for every platform."
      },
      {
        title: "Revision Support",
        description: "We work with you through revisions to ensure the final animation perfectly represents your brand."
      }
    ],

    process: [
      { step: "01", title: "Concept", desc: "Defining animation style, mood, and approach based on your brand" },
      { step: "02", title: "Storyboard", desc: "Planning the motion sequence and key animation frames" },
      { step: "03", title: "Animation", desc: "Crafting smooth, captivating motion with attention to detail" },
      { step: "04", title: "Review", desc: "Refining the animation based on your feedback" },
      { step: "05", title: "Export", desc: "Optimized files for all platforms and use cases" },
    ],

    industries: [
      { name: "Content Creators", description: "Eye-catching intros and outros for YouTube and streaming content." },
      { name: "Corporate", description: "Professional animations for presentations and company videos." },
      { name: "Entertainment", description: "Dynamic motion graphics for film, TV, and gaming." },
      { name: "E-commerce", description: "Engaging product reveal animations and brand experiences." },
      { name: "Social Media", description: "Scroll-stopping animated content for all platforms." },
      { name: "Events", description: "Spectacular visual introductions for conferences and launches." }
    ],

    areas: [
      {
        region: "North America",
        locations: ["United States", "Canada", "Mexico"],
        featured: true,
        clients: 120,
        flag: "🇺🇸",
      },
      {
        region: "Europe",
        locations: ["United Kingdom", "Germany", "France", "Netherlands"],
        featured: false,
        clients: 85,
        flag: "🇬🇧",
      },
      {
        region: "Middle East",
        locations: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
        featured: true,
        clients: 65,
        flag: "🇦🇪",
      },
      {
        region: "Asia Pacific",
        locations: ["Australia", "Singapore", "India", "Japan"],
        featured: false,
        clients: 95,
        flag: "🇦🇺",
      },
    ],


    caseStudies: [
      {
        title: "YouTube Content Creator",
        problem: "A growing content creator needed a professional intro that would establish credibility and brand recognition across their video content.",
        solution: "We created a dynamic 5-second animated intro that incorporated their logo with energetic motion matching their content style.",
        result: "Channel subscribers increased by 35% and viewer retention improved as the professional branding built trust with the audience."
      },
      {
        title: "Corporate Rebrand Launch",
        problem: "A company undergoing a major rebrand needed to announce their new identity in a memorable way across all digital channels.",
        solution: "We developed a cinematic logo reveal animation that told the story of their brand evolution, along with shorter social media versions.",
        result: "The reveal video garnered over 100K views and the animation became the centerpiece of their successful rebrand campaign."
      },
      {
        title: "E-commerce Brand Identity",
        problem: "An online retail brand wanted to stand out in a crowded market and create a premium perception for their products.",
        solution: "We designed an elegant animated logo with subtle, sophisticated motion that appeared on their website, emails, and unboxing videos.",
        result: "Customer surveys showed a significant increase in perceived brand value and the animation helped establish a luxury positioning."
      }
    ],

    faqs: [
      {
        question: "What length should my logo animation be?",
        answer: "It depends on the use case. Social media animations are typically 2-5 seconds, video intros 5-10 seconds, and cinematic reveals can be 15-30 seconds. We create multiple versions for different purposes."
      },
      {
        question: "Do I need a high-resolution logo for animation?",
        answer: "Yes, we recommend providing vector files (AI, EPS, or SVG) of your logo for the best animation quality. If you only have raster files, we can discuss options."
      },
      {
        question: "Can you animate a logo you didn't design?",
        answer: "Absolutely! We can animate any existing logo. Just provide us with the source files and we'll bring it to life."
      },
      {
        question: "What file formats will I receive?",
        answer: "We provide animations in MP4, MOV, GIF, and other formats as needed. We also include versions optimized for different platforms and resolutions."
      },
      {
        question: "Can animations be updated if my logo changes?",
        answer: "Yes, we can update existing animations when your logo evolves. We keep project files organized for easy modifications."
      }
    ]
  },

  "seo-services": {
    number: "03",
    title: "SEO Services",
    subtitle: "Dominate Search Results",
    description: "Boosting your visibility in search engine results to drive organic traffic and growth.",
    heroImage: '/assets/services/seo-services.jpg',

    introTitle: "Why SEO is Critical for Business Success",
    introContent: "In today's digital-first world, your potential customers are searching for products and services online. If your business doesn't appear on the first page of search results, you're invisible to the vast majority of your target audience. SEO is not just about rankings—it's about being discovered by the right people at the right time.",

    roleTitle: "The Role of SEO in Sustainable Business Growth",
    roleContent: [
      "SEO builds the foundation for long-term, sustainable traffic. Unlike paid advertising that stops when you stop paying, organic search visibility continues to deliver results over time, providing an exceptional return on investment.",
      "Search rankings signal trust and authority. Businesses that appear at the top of search results are perceived as industry leaders, building credibility before a customer even visits your website.",
      "SEO aligns your business with user intent. By optimizing for the terms your customers actually search, you attract qualified leads who are actively looking for what you offer."
    ],

    howWeHelpTitle: "How Our SEO Services Drive Real Results",
    howWeHelpPoints: [
      {
        title: "Data-Driven Strategy",
        description: "We base every decision on comprehensive research and analytics, targeting keywords and opportunities that will deliver the highest ROI for your business."
      },
      {
        title: "Technical Excellence",
        description: "We ensure your website meets all technical requirements that search engines demand—speed, mobile optimization, structured data, and crawlability."
      },
      {
        title: "Content Optimization",
        description: "We optimize existing content and create new content that ranks, engages users, and converts visitors into customers."
      }
    ],

    overview: "Visibility is everything in the digital world. Our SEO strategies are designed to improve your search rankings, drive qualified traffic, and establish your authority in your industry.",
    items: ["Keyword Research", "On-Page SEO", "Technical SEO", "Content Optimization", "Link Building", "Local SEO"],

    benefits: [
      "Higher search rankings",
      "Increased organic traffic",
      "Better user experience",
      "Long-term growth",
      "Competitive advantage"
    ],

    whyChooseUsPoints: [
      {
        title: "Proven Track Record",
        description: "We've helped businesses across industries achieve first-page rankings and significant traffic growth."
      },
      {
        title: "Transparent Reporting",
        description: "You'll receive detailed monthly reports showing exactly how your SEO investment is performing."
      },
      {
        title: "Ethical Practices",
        description: "We use only white-hat SEO techniques that build sustainable results without risking penalties."
      },
      {
        title: "Dedicated Support",
        description: "You'll have direct access to our SEO experts who understand your business and goals."
      }
    ],

    process: [
      { step: "01", title: "Audit", desc: "Comprehensive analysis of your current SEO performance and opportunities" },
      { step: "02", title: "Research", desc: "In-depth keyword and competitor research to inform strategy" },
      { step: "03", title: "Strategy", desc: "Custom SEO roadmap aligned with your business goals" },
      { step: "04", title: "Optimize", desc: "On-page, technical, and content improvements implementation" },
      { step: "05", title: "Monitor", desc: "Ongoing tracking, reporting, and strategy refinement" },
    ],

    industries: [
      { name: "E-commerce", description: "Product page optimization and category SEO for online stores." },
      { name: "Professional Services", description: "Local SEO and thought leadership content for service businesses." },
      { name: "Healthcare", description: "YMYL-compliant SEO strategies for medical practices." },
      { name: "Real Estate", description: "Location-based SEO for property listings and agents." },
      { name: "Technology", description: "Technical content SEO for SaaS and tech companies." },
      { name: "Hospitality", description: "Local and travel SEO for hotels, restaurants, and tourism." }
    ],

    areas: [
      {
        region: "North America",
        locations: ["United States", "Canada", "Mexico"],
        featured: true,
        clients: 120,
        flag: "🇺🇸",
      },
      {
        region: "Europe",
        locations: ["United Kingdom", "Germany", "France", "Netherlands"],
        featured: false,
        clients: 85,
        flag: "🇬🇧",
      },
      {
        region: "Middle East",
        locations: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
        featured: true,
        clients: 65,
        flag: "🇦🇪",
      },
      {
        region: "Asia Pacific",
        locations: ["Australia", "Singapore", "India", "Japan"],
        featured: false,
        clients: 95,
        flag: "🇦🇺",
      },
    ],


    caseStudies: [
      {
        title: "E-commerce Growth",
        problem: "An online retailer was struggling to compete with larger competitors and relied heavily on paid advertising for traffic.",
        solution: "We implemented a comprehensive SEO strategy focusing on long-tail product keywords, technical improvements, and content marketing.",
        result: "Organic traffic increased by 250% within 12 months, reducing paid ad dependency and significantly improving profit margins."
      },
      {
        title: "Local Service Business",
        problem: "A professional services firm was invisible in local search results, losing potential clients to competitors.",
        solution: "We optimized their Google Business Profile, built local citations, and created location-specific content targeting their service areas.",
        result: "The business now ranks #1 for their primary service keywords in their city, generating 40+ qualified leads per month from organic search."
      },
      {
        title: "B2B Technology Company",
        problem: "A SaaS company had great products but minimal organic visibility in a competitive market.",
        solution: "We developed a content strategy targeting decision-makers, optimized technical SEO, and built authoritative backlinks.",
        result: "Organic leads increased by 180% and the company established themselves as a thought leader in their space."
      }
    ],

    faqs: [
      {
        question: "How long does it take to see SEO results?",
        answer: "SEO is a long-term investment. Typically, you'll start seeing improvements within 3-6 months, with significant results in 6-12 months. The timeline depends on your starting point and competition."
      },
      {
        question: "Do you guarantee first page rankings?",
        answer: "No legitimate SEO provider can guarantee specific rankings, as search algorithms are controlled by Google. However, we have a strong track record of achieving first-page results for our clients."
      },
      {
        question: "What's included in your SEO services?",
        answer: "Our services include keyword research, on-page optimization, technical SEO, content strategy, link building, local SEO, and monthly reporting. We customize the approach based on your needs."
      },
      {
        question: "How do you measure SEO success?",
        answer: "We track rankings, organic traffic, conversions, and ROI. You'll receive detailed monthly reports showing progress across all key metrics."
      },
      {
        question: "Will SEO work for my industry?",
        answer: "SEO works for virtually every industry. The strategy and timeline may vary based on competition and search behavior, but there are always opportunities to improve visibility."
      }
    ]
  },

  "google-ads": {
    number: "04",
    title: "Google Ads",
    subtitle: "Targeted Advertising Excellence",
    description: "Driving targeted traffic through strategic Google advertising campaigns.",
    heroImage: '/assets/services/google-ads.jpg',

    introTitle: "Why Google Ads is Essential for Immediate Business Growth",
    introContent: "While SEO builds long-term organic visibility, Google Ads delivers immediate results by placing your business in front of customers actively searching for your products or services. With billions of searches happening daily, Google Ads provides unmatched reach and precision targeting to drive qualified traffic and conversions.",

    roleTitle: "The Power of Intent-Based Advertising",
    roleContent: [
      "Google Ads captures customers at their moment of highest intent. When someone searches for your product or service, they're actively looking to buy—and you can be right there with a compelling message.",
      "Unlike traditional advertising, every aspect of Google Ads is measurable. You know exactly how many people saw your ad, clicked it, and converted, allowing for continuous optimization.",
      "With flexible budgeting and bidding strategies, Google Ads works for businesses of all sizes. You can start small, prove ROI, and scale your investment as results grow."
    ],

    howWeHelpTitle: "How Our Google Ads Management Maximizes Your ROI",
    howWeHelpPoints: [
      {
        title: "Strategic Campaign Structure",
        description: "We build campaigns that align with your business goals, whether that's brand awareness, lead generation, or direct sales, with proper targeting and segmentation."
      },
      {
        title: "Compelling Ad Creative",
        description: "Our copywriters craft ads that stand out, communicate value, and drive clicks from qualified prospects."
      },
      {
        title: "Continuous Optimization",
        description: "We monitor performance daily and make data-driven adjustments to improve results and reduce wasted spend."
      }
    ],

    overview: "Reach your ideal customers at the moment they're searching. Our Google Ads strategies combine data-driven targeting with compelling creative to maximize your advertising ROI.",
    items: ["Campaign Strategy", "Ad Creation", "Bid Management", "Conversion Tracking", "Performance Reports", "A/B Testing"],

    benefits: [
      "Immediate visibility",
      "Targeted audience reach",
      "Measurable results",
      "Flexible budgeting",
      "Higher conversion rates"
    ],

    whyChooseUsPoints: [
      {
        title: "Certified Experts",
        description: "Our team holds Google Ads certifications and stays current with the latest platform features and best practices."
      },
      {
        title: "ROI Focused",
        description: "We don't just drive clicks—we focus on conversions and return on ad spend that impacts your bottom line."
      },
      {
        title: "Full Transparency",
        description: "You'll always know exactly where your budget is going and what results it's generating."
      },
      {
        title: "Proactive Management",
        description: "We don't set and forget. Your campaigns receive ongoing attention and optimization."
      }
    ],

    process: [
      { step: "01", title: "Research", desc: "Market analysis, competitor review, and keyword research" },
      { step: "02", title: "Strategy", desc: "Campaign structure, targeting, and budget planning" },
      { step: "03", title: "Setup", desc: "Campaign build, ad creation, and tracking implementation" },
      { step: "04", title: "Launch", desc: "Go live with optimized campaigns and close monitoring" },
      { step: "05", title: "Optimize", desc: "Continuous improvement based on performance data" },
    ],

    industries: [
      { name: "E-commerce", description: "Shopping campaigns and dynamic remarketing for online stores." },
      { name: "Lead Generation", description: "Search and display campaigns for service businesses." },
      { name: "Local Business", description: "Local campaigns to drive foot traffic and calls." },
      { name: "B2B", description: "Targeted campaigns reaching business decision-makers." },
      { name: "App Promotion", description: "App install and engagement campaigns." },
      { name: "Real Estate", description: "Property listing and buyer/seller lead campaigns." }
    ],

    areas: [
      {
        region: "North America",
        locations: ["United States", "Canada", "Mexico"],
        featured: true,
        clients: 120,
        flag: "🇺🇸",
      },
      {
        region: "Europe",
        locations: ["United Kingdom", "Germany", "France", "Netherlands"],
        featured: false,
        clients: 85,
        flag: "🇬🇧",
      },
      {
        region: "Middle East",
        locations: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
        featured: true,
        clients: 65,
        flag: "🇦🇪",
      },
      {
        region: "Asia Pacific",
        locations: ["Australia", "Singapore", "India", "Japan"],
        featured: false,
        clients: 95,
        flag: "🇦🇺",
      },
    ],


    caseStudies: [
      {
        title: "E-commerce Revenue Boost",
        problem: "An online store was spending heavily on ads but seeing poor return on investment with low conversion rates.",
        solution: "We restructured campaigns, improved targeting, optimized product feeds, and implemented smart bidding strategies.",
        result: "ROAS improved from 2x to 6x within three months, with the same budget now generating 3x more revenue."
      },
      {
        title: "Service Business Leads",
        problem: "A professional services firm needed a steady stream of qualified leads but found previous ad efforts wasteful.",
        solution: "We built targeted search campaigns with compelling ad copy, proper conversion tracking, and landing page optimization.",
        result: "Cost per lead decreased by 60% while lead quality improved significantly, filling the sales pipeline."
      },
      {
        title: "Local Restaurant Chain",
        problem: "A restaurant group wanted to increase awareness and drive visits to their multiple locations.",
        solution: "We implemented local campaigns with location extensions, promotional messaging, and audience targeting.",
        result: "Store visits increased by 45% and the cost per visit was 70% lower than traditional advertising channels."
      }
    ],

    faqs: [
      {
        question: "How much should I budget for Google Ads?",
        answer: "Budget depends on your industry, competition, and goals. We'll help you determine an appropriate starting budget and scale based on results. Many clients start with $1,000-5,000/month."
      },
      {
        question: "How quickly will I see results?",
        answer: "Unlike SEO, Google Ads delivers immediate visibility. You can start seeing traffic the same day campaigns launch, with optimization improving results over the first 2-4 weeks."
      },
      {
        question: "What types of campaigns do you manage?",
        answer: "We manage Search, Shopping, Display, Video (YouTube), and Performance Max campaigns. We'll recommend the right mix based on your goals."
      },
      {
        question: "Do I control my own ad spend?",
        answer: "Absolutely. You set the budget and we optimize within it. There are no hidden fees or markups on ad spend."
      },
      {
        question: "How do you measure success?",
        answer: "We track conversions that matter to your business—leads, sales, calls, or store visits—and optimize for cost per conversion and return on ad spend."
      }
    ]
  },

  "web-development": {
    number: "05",
    title: "Web Development",
    subtitle: "Build Your Digital Presence",
    description: "Building modern, high-performance websites that deliver exceptional user experiences.",
    heroImage: '/assets/services/web-development.jpg',

    introTitle: "Why Your Website is Your Most Important Business Asset",
    introContent: "Your website is your digital storefront, working 24/7 to attract, engage, and convert customers. In an age where first impressions happen online, a professionally designed and developed website isn't just nice to have—it's essential for business success. A great website builds trust, showcases your value, and drives measurable business results.",

    roleTitle: "The Impact of Professional Web Development",
    roleContent: [
      "Your website often provides the first impression of your business. Studies show that users form opinions about a website in just 0.05 seconds, and 94% of first impressions are design-related.",
      "A well-developed website is a conversion machine. From clear calls-to-action to optimized user journeys, every element should guide visitors toward becoming customers.",
      "Modern websites must perform flawlessly across all devices. With mobile traffic exceeding desktop, responsive design and fast loading speeds are non-negotiable."
    ],

    howWeHelpTitle: "How Our Web Development Services Transform Your Business",
    howWeHelpPoints: [
      {
        title: "Custom Design & Development",
        description: "We build websites from scratch that are unique to your brand, not cookie-cutter templates that look like everyone else."
      },
      {
        title: "Performance Optimization",
        description: "Every site we build is optimized for speed, with clean code, optimized images, and modern hosting solutions."
      },
      {
        title: "Built for Growth",
        description: "We create scalable solutions that grow with your business, with easy content management and room to expand functionality."
      }
    ],

    overview: "Your website is your digital storefront. We build fast, responsive, and visually stunning websites that not only look great but convert visitors into customers.",
    items: ["Custom Websites", "E-commerce", "CMS Integration", "Responsive Design", "Performance Optimization", "Maintenance & Support"],

    benefits: [
      "Modern, professional design",
      "Fast loading speeds",
      "Mobile-first approach",
      "SEO-friendly structure",
      "Easy content management"
    ],

    whyChooseUsPoints: [
      {
        title: "Full-Service Development",
        description: "From design to development to launch and beyond, we handle every aspect of your web project."
      },
      {
        title: "Modern Technologies",
        description: "We use the latest frameworks and best practices to build fast, secure, and maintainable websites."
      },
      {
        title: "Conversion Focus",
        description: "We don't just build pretty websites—we build websites that drive business results."
      },
      {
        title: "Ongoing Support",
        description: "Our relationship doesn't end at launch. We provide maintenance, updates, and support to keep your site running smoothly."
      }
    ],

    process: [
      { step: "01", title: "Discovery", desc: "Understanding your goals, audience, and requirements" },
      { step: "02", title: "Planning", desc: "Information architecture and technical specifications" },
      { step: "03", title: "Design", desc: "UI/UX design with your feedback at every stage" },
      { step: "04", title: "Development", desc: "Clean, scalable code with performance in mind" },
      { step: "05", title: "Launch", desc: "Testing, optimization, and go-live support" },
    ],

    industries: [
      { name: "Corporate", description: "Professional websites that establish authority and trust." },
      { name: "E-commerce", description: "Online stores built for conversions and easy management." },
      { name: "Startups", description: "Agile websites that can evolve with your growing business." },
      { name: "Professional Services", description: "Lead-generating websites for consultants and agencies." },
      { name: "Healthcare", description: "HIPAA-aware websites for medical practices." },
      { name: "Hospitality", description: "Booking-integrated websites for hotels and restaurants." }
    ],

    areas: [
      {
        region: "North America",
        locations: ["United States", "Canada", "Mexico"],
        featured: true,
        clients: 120,
        flag: "🇺🇸",
      },
      {
        region: "Europe",
        locations: ["United Kingdom", "Germany", "France", "Netherlands"],
        featured: false,
        clients: 85,
        flag: "🇬🇧",
      },
      {
        region: "Middle East",
        locations: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
        featured: true,
        clients: 65,
        flag: "🇦🇪",
      },
      {
        region: "Asia Pacific",
        locations: ["Australia", "Singapore", "India", "Japan"],
        featured: false,
        clients: 95,
        flag: "🇦🇺",
      },
    ],


    caseStudies: [
      {
        title: "E-commerce Launch",
        problem: "A retail brand needed to launch their online store quickly but with a custom design that matched their premium positioning.",
        solution: "We built a custom e-commerce site with stunning product photography, seamless checkout, and mobile optimization.",
        result: "The site launched on time and exceeded first-year revenue targets by 40%, with a 3.5% conversion rate above industry average."
      },
      {
        title: "Corporate Rebrand",
        problem: "A growing company had outgrown their template website and needed a professional presence that reflected their market position.",
        solution: "We created a custom corporate website with compelling messaging, case studies, and an intuitive structure.",
        result: "Time on site increased 200%, bounce rate dropped 45%, and inbound inquiries increased significantly."
      },
      {
        title: "Startup MVP",
        problem: "A startup needed to launch their product quickly with a website that could evolve as they learned from user feedback.",
        solution: "We built a lean, performant site with a CMS that allowed rapid content updates and A/B testing capabilities.",
        result: "The site helped the startup validate their market, attract initial customers, and secure seed funding."
      }
    ],

    faqs: [
      {
        question: "How long does it take to build a website?",
        answer: "Timeline depends on complexity. A simple brochure site might take 4-6 weeks, while a custom e-commerce platform could take 12-16 weeks. We'll provide a detailed timeline during planning."
      },
      {
        question: "Do you build on WordPress or custom code?",
        answer: "We work with various platforms depending on your needs—WordPress, Shopify, Webflow, or fully custom solutions. We'll recommend the best fit for your requirements and budget."
      },
      {
        question: "Will I be able to update the website myself?",
        answer: "Absolutely. We build with user-friendly content management systems and provide training so you can make updates independently."
      },
      {
        question: "Is hosting and maintenance included?",
        answer: "We offer hosting and maintenance packages to keep your site secure, updated, and performing optimally. We'll discuss options that fit your needs."
      },
      {
        question: "Will my website be mobile-friendly?",
        answer: "Yes, every website we build is fully responsive and tested across devices. Mobile-first design is a standard part of our process."
      }
    ]
  },

  "app-development": {
    number: "06",
    title: "App Development",
    subtitle: "Mobile Solutions That Scale",
    description: "Creating powerful mobile applications for iOS and Android platforms.",
    heroImage: '/assets/services/app-development.jpg',

    introTitle: "Why Mobile Apps Are Essential for Modern Businesses",
    introContent: "Mobile apps have transformed how businesses connect with customers. With users spending over 4 hours daily on mobile apps, having a presence in their pocket provides unprecedented access to your audience. A well-designed app can increase customer engagement, streamline operations, and open new revenue streams.",

    roleTitle: "The Business Value of Mobile Application Development",
    roleContent: [
      "Mobile apps create a direct channel to your customers. Push notifications, personalized experiences, and always-available access build stronger relationships and drive repeat engagement.",
      "Apps can transform your business operations. From customer-facing solutions to internal tools, mobile applications streamline processes and improve efficiency.",
      "A mobile app positions your business as modern and customer-focused. In competitive markets, having an app can be a key differentiator that attracts and retains customers."
    ],

    howWeHelpTitle: "How Our App Development Services Deliver Results",
    howWeHelpPoints: [
      {
        title: "Strategic Planning",
        description: "We start with your business goals and user needs, ensuring every feature serves a purpose and delivers value."
      },
      {
        title: "Native Performance",
        description: "Whether native iOS/Android or cross-platform, we build apps that feel fast, responsive, and natural to use."
      },
      {
        title: "Launch & Beyond",
        description: "We support you through app store submission and provide ongoing maintenance to keep your app performing at its best."
      }
    ],

    overview: "Mobile is where your customers are. We develop intuitive, high-performance apps that provide seamless experiences and drive engagement on both iOS and Android platforms.",
    items: ["iOS Apps", "Android Apps", "Cross-Platform", "UI/UX Design", "App Maintenance", "API Integration"],

    benefits: [
      "Native performance",
      "Intuitive user experience",
      "Cross-platform options",
      "Scalable architecture",
      "Ongoing support"
    ],

    whyChooseUsPoints: [
      {
        title: "Full Lifecycle Support",
        description: "From concept to launch to ongoing updates, we're your partner throughout the entire app journey."
      },
      {
        title: "Platform Expertise",
        description: "Our developers specialize in iOS, Android, and cross-platform technologies to recommend the best approach for your needs."
      },
      {
        title: "User-Centered Design",
        description: "We prioritize user experience to build apps that people actually want to use and recommend."
      },
      {
        title: "Agile Development",
        description: "We use iterative development processes that allow for flexibility and regular progress visibility."
      }
    ],

    process: [
      { step: "01", title: "Discovery", desc: "Requirements gathering and user research" },
      { step: "02", title: "Design", desc: "Wireframes, prototypes, and UI design" },
      { step: "03", title: "Development", desc: "Agile development with regular demos" },
      { step: "04", title: "Testing", desc: "Thorough QA across devices and scenarios" },
      { step: "05", title: "Launch", desc: "App store submission and deployment" },
    ],

    industries: [
      { name: "Retail & E-commerce", description: "Shopping apps that drive sales and customer loyalty." },
      { name: "Healthcare", description: "Patient apps, telehealth, and health tracking solutions." },
      { name: "Finance", description: "Secure banking and fintech applications." },
      { name: "Hospitality", description: "Booking, check-in, and guest experience apps." },
      { name: "Fitness", description: "Workout, tracking, and wellness applications." },
      { name: "On-Demand Services", description: "Delivery, booking, and marketplace apps." }
    ],

    areas: [
      {
        region: "North America",
        locations: ["United States", "Canada", "Mexico"],
        featured: true,
        clients: 120,
        flag: "🇺🇸",
      },
      {
        region: "Europe",
        locations: ["United Kingdom", "Germany", "France", "Netherlands"],
        featured: false,
        clients: 85,
        flag: "🇬🇧",
      },
      {
        region: "Middle East",
        locations: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
        featured: true,
        clients: 65,
        flag: "🇦🇪",
      },
      {
        region: "Asia Pacific",
        locations: ["Australia", "Singapore", "India", "Japan"],
        featured: false,
        clients: 95,
        flag: "🇦🇺",
      },
    ],


    caseStudies: [
      {
        title: "Retail Loyalty App",
        problem: "A retail chain wanted to increase customer retention and gather data on shopping behavior.",
        solution: "We built a loyalty app with personalized offers, purchase tracking, and easy reward redemption.",
        result: "Customer retention increased 25%, average order value grew 15%, and the app achieved 100K+ downloads in year one."
      },
      {
        title: "Fitness Platform",
        problem: "A fitness brand needed a companion app to enhance their in-person training programs.",
        solution: "We developed an iOS and Android app with workout tracking, video content, and progress analytics.",
        result: "Member engagement increased significantly, and the app became a key selling point for new memberships."
      },
      {
        title: "Internal Operations Tool",
        problem: "A service company needed to digitize field operations and reduce paperwork for their mobile workforce.",
        solution: "We created a custom app for job management, time tracking, photo documentation, and reporting.",
        result: "Administrative time reduced by 50%, data accuracy improved, and technicians could focus on their core work."
      }
    ],

    faqs: [
      {
        question: "Should I build for iOS, Android, or both?",
        answer: "It depends on your audience. We can analyze your target market to recommend the right approach. Cross-platform development is often cost-effective for reaching both platforms."
      },
      {
        question: "How much does app development cost?",
        answer: "App costs vary widely based on complexity. A simple app might start around $30K, while complex apps can exceed $150K. We provide detailed estimates after understanding your requirements."
      },
      {
        question: "How long does it take to build an app?",
        answer: "Timeline depends on scope. A basic app might take 3-4 months, while a feature-rich application could take 6-9 months or more. We can discuss phased approaches to get to market faster."
      },
      {
        question: "Do you handle app store submission?",
        answer: "Yes, we manage the entire submission process for both App Store and Google Play, including meeting all guidelines and requirements."
      },
      {
        question: "What about app updates and maintenance?",
        answer: "We offer ongoing maintenance packages that include bug fixes, OS updates, performance monitoring, and feature enhancements."
      }
    ]
  }
};

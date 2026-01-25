import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const LANDING_PAGE_CONTENT_QUERY = defineQuery(`*[_type == "landingPageContent"][0] {
  "hero": {
    "badge": hero.badge[$lang],
    "headingLines": hero.headingLines[]{
      "text": text[$lang],
      style
    },
    "descriptionParagraphs": hero.descriptionParagraphs[]{
      "text": text[$lang]
    },
    "ctaButtons": hero.ctaButtons[]{
      "text": text[$lang],
      "url": url[$lang],
      variant
    }
  },
  "servicesPreview": {
    "sectionHeading": {
      "eyebrow": servicesPreview.sectionHeading.eyebrow[$lang],
      "title": servicesPreview.sectionHeading.title[$lang],
      "description": servicesPreview.sectionHeading.description[$lang]
    }
  },
  "portfolioPreview": {
    "sectionHeading": {
      "eyebrow": portfolioPreview.sectionHeading.eyebrow[$lang],
      "title": portfolioPreview.sectionHeading.title[$lang],
      "description": portfolioPreview.sectionHeading.description[$lang]
    }
  },
  "aboutPreview": {
    "sectionHeading": {
      "eyebrow": aboutPreview.sectionHeading.eyebrow[$lang],
      "title": aboutPreview.sectionHeading.title[$lang],
      "description": aboutPreview.sectionHeading.description[$lang]
    },
    "leftDescriptions": aboutPreview.leftDescriptions[]{"text": text[$lang]},
    "rightDescriptions": aboutPreview.rightDescriptions[]{"text": text[$lang]},
    "ctaText": aboutPreview.ctaText[$lang],
    "ctaUrl": aboutPreview.ctaUrl[$lang]
  },
  "stats": {
    "projectsDelivered": {
      "value": stats.projectsDelivered.value,
      "label": stats.projectsDelivered.label[$lang],
      "suffix": stats.projectsDelivered.suffix
    },
    "yearsExperience": {
      "value": stats.yearsExperience.value,
      "label": stats.yearsExperience.label[$lang],
      "suffix": stats.yearsExperience.suffix
    },
    "clientSatisfaction": {
      "value": stats.clientSatisfaction.value,
      "label": stats.clientSatisfaction.label[$lang],
      "suffix": stats.clientSatisfaction.suffix
    }
  },
  "whyChooseUs": {
    "sectionHeading": {
      "eyebrow": whyChooseUs.sectionHeading.eyebrow[$lang],
      "title": whyChooseUs.sectionHeading.title[$lang],
      "description": whyChooseUs.sectionHeading.description[$lang]
    },
    "benefits": whyChooseUs.benefits[]{
      "title": title[$lang],
      "description": description[$lang],
      iconName
    }
  },
  "blogPreview": {
    "sectionHeading": {
      "eyebrow": blogPreview.sectionHeading.eyebrow[$lang],
      "title": blogPreview.sectionHeading.title[$lang],
      "description": blogPreview.sectionHeading.description[$lang]
    }
  },
  "faqs": {
    "sectionHeading": {
      "eyebrow": faqs.sectionHeading.eyebrow[$lang],
      "title": faqs.sectionHeading.title[$lang],
      "description": faqs.sectionHeading.description[$lang]
    },
    "faqItems": faqs.faqItems[]{
      "question": question[$lang],
      "answer": answer[$lang]
    },
    "buttonText": faqs.buttonText[$lang],
    "buttonUrl": faqs.buttonUrl[$lang]
  },
  "serviceHighlightsMarquee": {
    "highlights": serviceHighlightsMarquee.highlights[]{
      "text": text[$lang]
    }
  },
  "trustedByBrands": {
    "sectionHeading": {
      "eyebrow": trustedByBrands.sectionHeading.eyebrow[$lang],
      "title": trustedByBrands.sectionHeading.title[$lang],
      "description": trustedByBrands.sectionHeading.description[$lang]
    },
    "brandLogos": trustedByBrands.brandLogos[]{
      "asset": asset->{
        _id,
        url,
        "altText": altText[$lang]
      },
    }
  },
  "ourApproach": {
    "sectionHeading": {
      "eyebrow": ourApproach.sectionHeading.eyebrow[$lang],
      "title": ourApproach.sectionHeading.title[$lang],
      "description": ourApproach.sectionHeading.description[$lang]
    },
    "steps": ourApproach.steps[]{
      "title": title[$lang],
      "description": description[$lang],
      featured,
      iconName
    }
  },
  "caseStudiesPreview": {
    "sectionHeading": {
      "eyebrow": caseStudiesPreview.sectionHeading.eyebrow[$lang],
      "title": caseStudiesPreview.sectionHeading.title[$lang],
      "description": caseStudiesPreview.sectionHeading.description[$lang]
    }
  },
  "areasWeServe": {
    "sectionHeading": {
      "eyebrow": areasWeServe.sectionHeading.eyebrow[$lang],
      "title": areasWeServe.sectionHeading.title[$lang],
      "description": areasWeServe.sectionHeading.description[$lang]
    },
    "areas": areasWeServe.areas[]{
      "region": region[$lang],
      "locations": locations[][$lang],
      featured,
      clients,
      flag
    }
  },
  "industriesWeServe": {
    "sectionHeading": {
      "eyebrow": industriesWeServe.sectionHeading.eyebrow[$lang],
      "title": industriesWeServe.sectionHeading.title[$lang],
      "description": industriesWeServe.sectionHeading.description[$lang]
    },
    "industries": industriesWeServe.industries[]{
      "name": name[$lang],
      "description": description[$lang],
      iconName
    }
  },
  "testimonials": {
    "sectionHeading": {
      "eyebrow": testimonials.sectionHeading.eyebrow[$lang],
      "title": testimonials.sectionHeading.title[$lang],
      "description": testimonials.sectionHeading.description[$lang]
    },
    "testimonials": testimonials.testimonials[]{
      "quote": quote[$lang],
      "author": author[$lang],
      "role": role[$lang],
      "company": company[$lang],
      "avatar": avatar.asset->{
        _id,
        url,
        "altText": altText[$lang]
      }
    }
  },
  "leadership": {
    "sectionHeading": {
      "eyebrow": leadership.sectionHeading.eyebrow[$lang],
      "title": leadership.sectionHeading.title[$lang],
      "description": leadership.sectionHeading.description[$lang]
    },
    "founder": {
      "name": leadership.founder.name[$lang],
      "role": leadership.founder.role[$lang],
      "image": leadership.founder.image.asset->{
        _id,
        url,
        "altText": altText[$lang]
      },
      "socialLinks": leadership.founder.socialLinks[]{
        platform,
        url
      }
    },
    "agencyStructure": leadership.agencyStructure[]{
      "title": title[$lang],
      "description": description[$lang],
      featured,
      iconName
    }
  },
  "cta": {
    "badge": cta.badge[$lang],
    "heading": cta.heading[$lang],
    "description": cta.description[$lang],
    "benefits": cta.benefits[]{"text": text[$lang]},
    "formId": cta.formId._ref
  }
}`);

export async function getLandingPageContent(lang: string) {
  try {
    const { data } = await sanityFetch({
      query: LANDING_PAGE_CONTENT_QUERY,
      params: { lang },
      perspective: "published"
    });
    return data as any;
  } catch (error) {
    console.error("Failed to fetch landing page content:", error);
    throw error;
  }
}

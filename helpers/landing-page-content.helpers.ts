import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const LANDING_PAGE_CONTENT_QUERY = defineQuery(`
  *[_type == "landingPageContent"][0] {
    "hero": {
      "badge": hero.badge,
      "headingLines": hero.headingLines[]{
        "text": text,
        style
      },
      "descriptionParagraphs": hero.descriptionParagraphs[]{
        "text": text
      },
      "ctaButtons": hero.ctaButtons[]{
        "text": text,
        "url": url,
        variant
      }
    },
    "servicesPreview": *[_type == "globalSections" && _id == "globalSections"][0].servicesPreview {
      sectionHeading {
        eyebrow,
        title,
        description
      }
    },
    "portfolioPreview": {
      "sectionHeading": {
        "eyebrow": portfolioPreview.sectionHeading.eyebrow,
        "title": portfolioPreview.sectionHeading.title,
        "description": portfolioPreview.sectionHeading.description
      }
    },
    "aboutPreview": {
      "sectionHeading": {
        "eyebrow": aboutPreview.sectionHeading.eyebrow,
        "title": aboutPreview.sectionHeading.title,
        "description": aboutPreview.sectionHeading.description
      },
      "leftDescriptions": aboutPreview.leftDescriptions[]{"text": text},
      "rightDescriptions": aboutPreview.rightDescriptions[]{"text": text},
      "ctaText": aboutPreview.ctaText,
      "ctaUrl": aboutPreview.ctaUrl
    },
    "stats": *[_type == "globalSections" && _id == "globalSections"][0].stats {
      "projectsDelivered": {
        "value": projectsDelivered.value,
        "label": projectsDelivered.label,
        "suffix": projectsDelivered.suffix
      },
      "yearsExperience": {
        "value": yearsExperience.value,
        "label": yearsExperience.label,
        "suffix": yearsExperience.suffix
      },
      "clientSatisfaction": {
        "value": clientSatisfaction.value,
        "label": clientSatisfaction.label,
        "suffix": clientSatisfaction.suffix
      }
    },
    "whyChooseUs": *[_type == "globalSections" && _id == "globalSections"][0].whyChooseUs {
      "sectionHeading": {
        "eyebrow": sectionHeading.eyebrow,
        "title": sectionHeading.title,
        "description": sectionHeading.description
      },
      "benefits": benefits[]{
        "title": title,
        "description": description,
        iconName
      }
    },
    "blogPreview": {
      "sectionHeading": {
        "eyebrow": blogPreview.sectionHeading.eyebrow,
        "title": blogPreview.sectionHeading.title,
        "description": blogPreview.sectionHeading.description
      }
    },
    "faqs": *[_type == "globalSections" && _id == "globalSections"][0].faqs {
      "sectionHeading": {
        "eyebrow": sectionHeading.eyebrow,
        "title": sectionHeading.title,
        "description": sectionHeading.description
      },
      "faqItems": faqItems[]{
        "question": question,
        "answer": answer
      },
      "buttonText": buttonText,
      "buttonUrl": buttonUrl
    },
    "serviceHighlightsMarquee": {
      "highlights": serviceHighlightsMarquee.highlights[]{
        "text": text
      }
    },
    "trustedByBrands": {
      "sectionHeading": {
        "eyebrow": trustedByBrands.sectionHeading.eyebrow,
        "title": trustedByBrands.sectionHeading.title,
        "description": trustedByBrands.sectionHeading.description
      },
      "brandLogos": trustedByBrands.brandLogos[]{
        "asset": asset->{
          _id,
          url,
          "altText": altText
        },
      }
    },
    "ourApproach": *[_type == "globalSections" && _id == "globalSections"][0].ourApproach {
      "sectionHeading": {
        "eyebrow": sectionHeading.eyebrow,
        "title": sectionHeading.title,
        "description": sectionHeading.description
      },
      "steps": steps[]{
        "title": title,
        "description": description,
        featured,
        iconName
      }
    },
    "caseStudiesPreview": {
      "sectionHeading": {
        "eyebrow": caseStudiesPreview.sectionHeading.eyebrow,
        "title": caseStudiesPreview.sectionHeading.title,
        "description": caseStudiesPreview.sectionHeading.description
      }
    },
    "areasWeServe": {
      "sectionHeading": {
        "eyebrow": areasWeServe.sectionHeading.eyebrow,
        "title": areasWeServe.sectionHeading.title,
        "description": areasWeServe.sectionHeading.description
      },
      "areas": areasWeServe.areas[]{
        "region": region,
        "locations": locations[],
        featured,
        clients,
        flag
      }
    },
    "industriesWeServe": *[_type == "globalSections" && _id == "globalSections"][0].industriesWeServe {
      "sectionHeading": {
        "eyebrow": sectionHeading.eyebrow,
        "title": sectionHeading.title,
        "description": sectionHeading.description
      },
      "industries": industries[]{
        "name": name,
        "description": description,
        iconName
      }
    },
    "testimonials": {
      "sectionHeading": {
        "eyebrow": testimonials.sectionHeading.eyebrow,
        "title": testimonials.sectionHeading.title,
        "description": testimonials.sectionHeading.description
      },
      "testimonials": testimonials.testimonials[]{
        "quote": quote,
        "author": author,
        "role": role,
        "company": company,
        "avatar": avatar.asset->{
          _id,
          url,
          "altText": altText
        }
      }
    },
    "leadership": *[_type == "globalSections" && _id == "globalSections"][0].leadership {
      "sectionHeading": {
        "eyebrow": sectionHeading.eyebrow,
        "title": sectionHeading.title,
        "description": sectionHeading.description
      },
      "founder": {
        "name": founder.name,
        "role": founder.role,
        "image": founder.image.asset->{
          _id,
          url,
          "altText": altText
        },
        "socialLinks": founder.socialLinks[]{
          platform,
          url
        }
      },
      "agencyStructure": agencyStructure[]{
        "title": title,
        "description": description,
        featured,
        iconName
      }
    },
    "cta": *[_type == "globalSections" && _id == "globalSections"][0].cta {
      "badge": badge,
      "heading": heading,
      "description": description,
      "benefits": benefits[]{"text": text},
      "formId": formId._ref
    }
  }
`);

export async function getLandingPageContent() {

  try {
    const { data } = await sanityFetch({
      query: LANDING_PAGE_CONTENT_QUERY,
      perspective: "published"
    });
    console.log(data);

    return data as any;
  } catch (error) {
    console.error("Failed to fetch landing page content:", error);
    throw error;
  }
}

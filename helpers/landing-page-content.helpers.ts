import { sanityFetch } from "@/sanity/lib/live";

const LANDING_PAGE_CONTENT_QUERY_BY_LOCALE = `{
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
    }
  },
  "stats": {
    "projectsDelivered": {
      "value": stats.projectsDelivered.value[$lang],
      "label": stats.projectsDelivered.label[$lang],
      "suffix": stats.projectsDelivered.suffix
    },
    "yearsExperience": {
      "value": stats.yearsExperience.value[$lang],
      "label": stats.yearsExperience.label[$lang],
      "suffix": stats.yearsExperience.suffix
    },
    "clientSatisfaction": {
      "value": stats.clientSatisfaction.value[$lang],
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
  "faqs": faqs[]{
    "question": question[$lang],
    "answer": answer[$lang]
  },
  "cta": {
    "badge": cta.badge[$lang],
    "heading": cta.heading[$lang],
    "description": cta.description[$lang],
    "buttonText": cta.buttonText[$lang],
    "buttonUrl": cta.buttonUrl[$lang]
  }
}`;

export async function getLandingPageContent(lang: string) {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "landingPageContent"][0] ${LANDING_PAGE_CONTENT_QUERY_BY_LOCALE}`,
      params: { lang },
      perspective: "published"
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch landing page content:", error);
    throw error;
  }
}

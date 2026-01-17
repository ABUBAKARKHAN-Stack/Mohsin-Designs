import { sanityFetch } from "@/sanity/lib/live";

const SERVICES_PAGE_CONTENT_QUERY_BY_LOCALE = `{
  "hero": {
    "title": hero.title[$lang],
    "subtitle": hero.subtitle[$lang],
    "description": hero.description[$lang]
  },
  "intro": {
    "badgeText": intro.badgeText[$lang],
    "heading": intro.heading[$lang],
    "headingAccent": intro.headingAccent[$lang],
    "description": intro.description[$lang]
  },
  "process": {
    "sectionHeading": {
      "eyebrow": process.sectionHeading.eyebrow[$lang],
      "title": process.sectionHeading.title[$lang],
      "description": process.sectionHeading.description[$lang]
    },
    "steps": process.steps[]{
      "title": title[$lang],
      "description": description[$lang],
      "duration": duration[$lang],
      iconName
    }
  },
  "whyChooseUs": {
    "sectionHeading": {
      "eyebrow": whyChooseUs.sectionHeading.eyebrow[$lang],
      "title": whyChooseUs.sectionHeading.title[$lang],
      "description": whyChooseUs.sectionHeading.description[$lang]
    },
    "guaranteePoints": whyChooseUs.guaranteePoints[][$lang],
    "benefits": whyChooseUs.benefits[]{
      "title": title[$lang],
      "description": description[$lang],
      iconName
    }
  }
}`;

export async function getServicesPageContent(lang: string) {
    try {
        const { data } = await sanityFetch({
            query: `*[_type == "servicesPageContent"][0] ${SERVICES_PAGE_CONTENT_QUERY_BY_LOCALE}`,
            params: { lang },
            perspective: "published"
        });
        return data;
    } catch (error) {
        console.error("Failed to fetch services page content:", error);
        throw error;
    }
}

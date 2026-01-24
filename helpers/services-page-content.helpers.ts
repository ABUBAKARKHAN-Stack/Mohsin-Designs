import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const SERVICES_PAGE_CONTENT_QUERY = defineQuery(`*[_type == "servicesPageContent"][0] {
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
}`);

export async function getServicesPageContent(lang: string) {
  try {
    const { data } = await sanityFetch({
      query: SERVICES_PAGE_CONTENT_QUERY,
      params: { lang },
      perspective: "published"
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch services page content:", error);
    throw error;
  }
}

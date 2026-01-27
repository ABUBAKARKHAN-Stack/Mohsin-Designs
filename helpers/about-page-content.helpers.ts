import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const ABOUT_PAGE_CONTENT_QUERY = defineQuery(`*[_type == "aboutPageContent"][0] {
  "hero": {
    "title": hero.title[$lang],
    "subtitle": hero.subtitle[$lang],
    "description": hero.description[$lang]
  },
  "intro": {
    "badge": intro.badge[$lang],
    "heading": intro.heading[$lang],
    "description1": intro.description1[$lang],
    "description2": intro.description2[$lang],
    "quote": intro.quote[$lang],
    "mainImage": intro.mainImage.asset->{
      _id,
      url,
      "altText": altText[$lang]
    },
    "sinceYear": intro.sinceYear
  },
  "missionVision": {
    "sectionHeading": {
      "eyebrow": missionVision.sectionHeading.eyebrow[$lang],
      "title": missionVision.sectionHeading.title[$lang],
      "description": missionVision.sectionHeading.description[$lang]
    },
    "mission": {
      "eyebrow": missionVision.mission.eyebrow[$lang],
      "title": missionVision.mission.title[$lang],
      "description1": missionVision.mission.description1[$lang],
      "description2": missionVision.mission.description2[$lang],
      "keyPoints": missionVision.mission.keyPoints[][$lang]
    },
    "vision": {
      "eyebrow": missionVision.vision.eyebrow[$lang],
      "title": missionVision.vision.title[$lang],
      "description1": missionVision.vision.description1[$lang],
      "description2": missionVision.vision.description2[$lang],
      "keyPoints": missionVision.vision.keyPoints[][$lang]
    }
  },
  "philosophy": {
    "sectionHeading": {
      "eyebrow": philosophy.sectionHeading.eyebrow[$lang],
      "title": philosophy.sectionHeading.title[$lang],
      "description": philosophy.sectionHeading.description[$lang]
    },
    "quoteBlock": philosophy.quoteBlock[$lang],
    "description1": philosophy.description1[$lang],
    "description2": philosophy.description2[$lang],
    "steps": philosophy.steps[]{
      "label": label[$lang],
      "iconName": iconName
    }
  },
  "globalReach": {
    "badge": globalReach.badge[$lang],
    "heading": globalReach.heading[$lang],
    "description1": globalReach.description1[$lang],
    "description2": globalReach.description2[$lang],
    "regions": globalReach.regions[][$lang],
    "stats": globalReach.stats[]{
      "value": value,
      "label": label[$lang]
    }
  },
  "culture": {
    "sectionHeading": {
      "eyebrow": culture.sectionHeading.eyebrow[$lang],
      "title": culture.sectionHeading.title[$lang],
      "description": culture.sectionHeading.description[$lang]
    },
    "values": culture.values[]{
      "title": title[$lang],
      "description": description[$lang],
      iconName
    },
    "quote": culture.quote[$lang],
    "quoteHighlight": culture.quoteHighlight[$lang]
  }
}`);

export async function getAboutPageContent(lang: string) {
  try {
    const { data } = await sanityFetch({
      query: ABOUT_PAGE_CONTENT_QUERY,
      params: { lang },
      perspective: "published"
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch about page content:", error);
    throw error;
  }
}

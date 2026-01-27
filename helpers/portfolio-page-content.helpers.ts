import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { PortfolioPageContentData } from "@/types/form.types";

export const PORTFOLIO_PAGE_CONTENT_QUERY = defineQuery(`*[_type == "portfolioPageContent"][0] {
  "hero": {
    "title": hero.title[$lang],
    "subtitle": hero.subtitle[$lang],
    "description": hero.description[$lang]
  },
  "portfolioList": {
    "projects": portfolioList.projects[]->{
      _id,
      "title": title[$lang],
      "slug": slug.current,
      "category": category[$lang],
      "image": mainImage.asset->{
        _id,
        url,
        "altText": altText[$lang]
      },
      "description": description[$lang]
    }
  },
  "cta": {
    "sectionHeading": {
      "eyebrow": cta.sectionHeading.eyebrow[$lang],
      "title": cta.sectionHeading.title[$lang],
      "description": cta.sectionHeading.description[$lang]
    },
    "form": cta.formReference->{
      _id,
      name,
      "submitButtonText": submitButtonText[$lang],
      "successMessage": successMessage[$lang],
      fields[]{
        fieldType,
        fieldName,
        "label": label[$lang],
        "placeholder": placeholder[$lang],
        required,
        validation,
        options[]{
          "label": label[$lang],
          value
        }
      }
    }
  }
}`);

export async function getPortfolioPageContent(lang: string) {
  try {
    const { data } = await sanityFetch({
      query: PORTFOLIO_PAGE_CONTENT_QUERY,
      params: { lang },
      perspective: "published"
    });
    return data as PortfolioPageContentData;
  } catch (error) {
    console.error("Failed to fetch portfolio page content:", error);
    return null;
  }
}

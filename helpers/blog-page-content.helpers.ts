import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { BlogPageContentData } from "@/types/blog.types";

export const BLOG_PAGE_CONTENT_QUERY = defineQuery(`*[_type == "blogPageContent"][0] {
  "hero": {
    "title": hero.title[$lang],
    "subtitle": hero.subtitle[$lang],
    "description": hero.description[$lang]
  },
  "blogList": {
    "posts": blogList.posts[]->{
      _id,
      "title": title[$lang],
      "slug": slug.current,
      "description": description[$lang],
      "categories": categories[]->title[$lang],
      author,
      "date": _createdAt,
      "image": mainImage.asset->{
        _id,
        url,
        "altText": altText[$lang]
      },
      "readTime": readTime,
      "tags": tags[$lang],
      "featured": featured,
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

export async function getBlogPageContent(lang: string) {
    try {
        const { data } = await sanityFetch({
            query: BLOG_PAGE_CONTENT_QUERY,
            params: { lang },
            perspective: "published"
        });
        return data as BlogPageContentData;
    } catch (error) {
        console.error("Failed to fetch blog page content:", error);
        return null;
    }
}

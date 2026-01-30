import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

// Query for single blog post with full content
const BLOG_POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  "title": title,
  "description": description,
  "slug": slug.current,
  "author": author,
  "readTime": readTime,
  "publishedAt": publishedAt,
  "tags": tags,
  "categories": categories[]->title,
  "mainImage": {
    "url": mainImage.asset->url,
    "altText": mainImage.alt,
    "_id": mainImage.asset->_id
  },
  "body": body,
}`);

// Query for all blog post slugs (for static generation)
const BLOG_SLUGS_QUERY = defineQuery(`*[_type == "post"] {
  "slug": slug.current
}`);

export async function getBlogPost(slug: string) {
  try {
    const { data } = await sanityFetch({
      query: BLOG_POST_QUERY,
      params: { slug },
      perspective: "published"
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return null;
  }
}

export async function getBlogSlugs() {
  try {
    const { data } = await sanityFetch({
      query: BLOG_SLUGS_QUERY,
      perspective: "published"
    });
    return data as { slug: string }[];
  } catch (error) {
    console.error("Failed to fetch blog slugs:", error);
    return [];
  }
}

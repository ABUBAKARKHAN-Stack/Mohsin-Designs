import { sanityFetch } from "@/sanity/lib/live";
import { ServiceCTA, ServiceData, ServiceLightWeight } from "@/types/services.types";

const SERVICE_QUERY_BY_LOCALE = `{

  "title": title[$lang],
  "subtitle": subtitle[$lang],
  "description":description[$lang],
  "slug": slug.current,
  heroImage{
    "alt": alt[$lang],
    "source": asset._ref
  },

  // Intro Section
  "introTagLine": introTagLine[$lang],
  "introTitle": introTitle[$lang],
  "introContent": introContent[$lang],

  // Role Section
  "roleTitle": roleTitle[$lang],
  "roleContent": roleContent[][$lang],

  // How We Help Section
  "howWeHelpSection": {
    "eyebrow": howWeHelpSection.eyebrow[$lang],
    "title": howWeHelpSection.title[$lang],
    "description": howWeHelpSection.description[$lang]
  },

  "howWeHelpPoints": howWeHelpPoints[]{
    "title": title[$lang],
    "description": description[$lang]
  },

  // Overview & Items
  "overviewSection": {
    "eyebrow": overviewSection.eyebrow[$lang],
    "title": overviewSection.title[$lang],
    "description": overviewSection.description[$lang]
  },
  "items": items[][$lang],

  // Process Section
  "processSection": {
    "eyebrow": processSection.eyebrow[$lang],
    "title": processSection.title[$lang],
    "description": processSection.description[$lang]
  },
  "process": process[]{
    step,
    "title": title[$lang],
    "desc": desc[$lang]
  },

  // Areas Section
  "areasSection": {
    "eyebrow": areasSection.eyebrow[$lang],
    "title": areasSection.title[$lang],
    "description": areasSection.description[$lang]
  },
  "areas": areas[]{
    "region": region[$lang],
    "locations": locations[][$lang],
    featured,
    clients,
    flag
  },

  // Industries Section
  "industriesSection": {
    "eyebrow": industriesSection.eyebrow[$lang],
    "title": industriesSection.title[$lang],
    "description": industriesSection.description[$lang]
  },
  "industries": industries[]{
    "name": name[$lang],
    "description": description[$lang]
  },

  // Benefits
   "benifitsSection": {
    "eyebrow": benifitsSection.eyebrow[$lang],
    "title": benifitsSection.title[$lang],
    "description": benifitsSection.description[$lang]
  },
  "benefits": benefits[][$lang],

  // Why Choose Us
   "whyChooseUsSection": {
    "eyebrow": whyChooseUsSection.eyebrow[$lang],
    "title": whyChooseUsSection.title[$lang],
    "description": whyChooseUsSection.description[$lang]
  },
  "whyChooseUsPoints": whyChooseUsPoints[]{
    "title": title[$lang],
    "description": description[$lang]
  },

  // Case Studies
  "caseStudiesSection": {
    "eyebrow": caseStudiesSection.eyebrow[$lang],
    "title": caseStudiesSection.title[$lang],
    "description": caseStudiesSection.description[$lang]
  },
  "caseStudies": caseStudies[]{
    "title": title[$lang],
    "problem": problem[$lang],
    "solution": solution[$lang],
    "result": result[$lang]
  },

  // FAQs
  "faqsSection": {
    "eyebrow": faqsSection.eyebrow[$lang],
    "title": faqsSection.title[$lang],
    "description": faqsSection.description[$lang]
  },
  "faqs": faqs[]{
    "question": question[$lang],
    "answer": answer[$lang]
  },

}`;

const SERVICE_QUERY_LIGHT_WEIGHT_BY_LOCALE = `{
  "title": title[$lang],
  "slug": slug.current,
  "items": items[][$lang],
}`

const SERVICE_SEO_QUERY_BY_LOCALE = `{
  "slug": slug.current,

  heroImage{
    "alt": alt[$lang],
    "source": asset._ref
  },
  "seo": seo{
    "metaTitle": metaTitle[$lang],
    "metaDescription": metaDescription[$lang],
    "keywords": keywords[][$lang],
    schema
  }
}`;

const SERVICE_CTA_QUERY_BY_LOCALE = `{
  "badgeText": ctaBadgeText[$lang],
  "title": ctaTitle[$lang],
  "description":ctaDescription[$lang],
  "buttonText": ctaButtonText[$lang],
  "url": ctaButtonUrl[$lang],
}`;



const getServicesForSSG = async () => {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "service"]{ "slug": slug.current }`,
      perspective: "published"
    })
    const services = data as { slug: string }[];
    return services ?? []
  } catch (error) {
    console.log("Sanity Error :: ", error);
    throw error;
  }
}

const getServicesByLocale = async (lang: string) => {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "service"] ${SERVICE_QUERY_BY_LOCALE}`,
      params: {
        lang
      },
      perspective: "published"
    })
    const services = data as ServiceData[];
    return services ?? []
  } catch (error) {
    console.log("Sanity Error :: ", error);
    throw error;
  }

}

const getLightWeightServicesByLocale = async (lang: string) => {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "service"] ${SERVICE_QUERY_LIGHT_WEIGHT_BY_LOCALE}`,
      params: {
        lang
      },
      perspective: "published"
    })
    const services = data as ServiceLightWeight[];
    return services ?? []
  } catch (error) {
    console.log("Sanity Error :: ", error);
    throw error;
  }

}

const getServiceByLocale = async (
  lang: string,
  slug: string
) => {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "service" && slug.current == $slug][0] ${SERVICE_QUERY_BY_LOCALE}`,
      params: {
        lang,
        slug
      },
      perspective: "published"
    })
    const service = data as ServiceData;
    return service ?? null
  } catch (error) {
    console.log("Sanity Error :: ", error);
    throw error;
  }

}


const getServiceSeoByLocale = async (
  lang: string,
  slug: string
) => {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "service" && slug.current == $slug][0] ${SERVICE_SEO_QUERY_BY_LOCALE}`,
      params: {
        lang,
        slug
      },
      perspective: "published"
    })
    const seo = data;
    return seo ?? null
  } catch (error) {
    console.log("Sanity Error :: ", error);
    throw error;
  }

}


const getServicesCTA = async (
  lang: string,
) => {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "serviceCta"][0] ${SERVICE_CTA_QUERY_BY_LOCALE}`,
      params: {
        lang,
      },
      perspective: "published"
    })
    const cta = data as ServiceCTA;
    return cta ?? null
  } catch (error) {
    console.log("Sanity Error :: ", error);
    throw error;
  }

}

export {
  getServicesForSSG,
  getServicesByLocale,
  getLightWeightServicesByLocale,
  getServiceByLocale,
  getServiceSeoByLocale,
  getServicesCTA
}
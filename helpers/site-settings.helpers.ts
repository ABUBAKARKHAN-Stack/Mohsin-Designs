import { sanityFetch } from "@/sanity/lib/live";

const SITE_SETTINGS_QUERY_BY_LOCALE = `{
  "siteName": siteName[$lang],
  "tagline": tagline[$lang],
  "logo": logo.asset->{
    _id,
    url,
    "altText": altText[$lang]
  },
  "favicon": favicon.asset->{
    _id,
    url,
    "altText": altText[$lang]
  },
  "seo": {
    "metaTitle": seo.metaTitle[$lang],
    "metaDescription": seo.metaDescription[$lang],
    "keywords": seo.keywords[][$lang],
    "schema": seo.schema
  },
  "social": social,
  "contact": {
    "email": contact.email,
    "phone": contact.phone,
    "address": contact.address[$lang]
  },
  "footerText": footerText[$lang],
  "copyright": copyright[$lang],
  "headerMenu": headerMenu-> {
    "title": title,
    "slug": slug.current,
    "items": items[] {
      "label": label[$lang],
      "description": description[$lang],
      type,
      "url": url[$lang],
      "reference": reference-> {
        _type,
        "title": title[$lang],
        "items": items[][$lang],
        "slug": slug.current
      },
      "children": children[] {
        "label": label[$lang],
        "description": description[$lang],
        type,
        "url": url[$lang],
        "reference": reference-> {
          _type,
          "title": title[$lang],
          "slug": slug.current
        },
        "children": children[] {
          "label": label[$lang],
          "description": description[$lang],
          type,
          "url": url[$lang],
          "reference": reference-> {
            _type,
            "title": title[$lang],
            "slug": slug.current
          }
        }
      }
    }
  },
  "footerMenu": footerMenu-> {
    "title": title,
    "slug": slug.current,
    "items": items[] {
      "label": label[$lang],
      "description": description[$lang],
      type,
      "url": url[$lang],
      "reference": reference-> {
        _type,
        "title": title[$lang],
        "slug": slug.current
      },
      "children": children[] {
        "label": label[$lang],
        "description": description[$lang],
        type,
        "url": url[$lang],
        "reference": reference-> {
          _type,
          "title": title[$lang],
          "slug": slug.current
        },
        "children": children[] {
          "label": label[$lang],
          "description": description[$lang],
          type,
          "url": url[$lang],
          "reference": reference-> {
            _type,
            "title": title[$lang],
            "slug": slug.current
          }
        }
      }
    }
  }
}`;

export type MenuItemData = {
    label: string;
    description?: string;
    type: 'reference' | 'custom';
    url?: string;
    reference?: {
        _type: string;
        title: string;
        slug: string;
    };
    children?: MenuItemData[];
};

export type MenuData = {
    title: string;
    slug: string;
    items: MenuItemData[];
};

export type SiteSettingsData = {
    siteName: string;
    tagline: string;
    logo?: {
        url: string;
        altText?: string;
    };
    favicon?: {
        url: string;
        altText?: string;
    };
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[];
        schema?: string;
    };
    social: {
        facebook: string;
        twitter: string;
        linkedin: string;
        instagram: string;
    };
    contact: {
        email: string;
        phone: string;
        address: string;
    };
    footerText: string;
    copyright: string;
    headerMenu?: MenuData;
    footerMenu?: MenuData;
};

export const getSiteSettingsByLocale = async (lang: string) => {
    try {
        const { data } = await sanityFetch({
            query: `*[_type == "siteSettings"][0] ${SITE_SETTINGS_QUERY_BY_LOCALE}`,
            params: {
                lang
            },
            perspective: "published"
        })
        const settings = data as SiteSettingsData;
        return settings ?? null
    } catch (error) {
        console.log("Sanity Error :: ", error);
        return null;
    }
}

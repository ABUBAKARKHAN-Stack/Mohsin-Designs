import { WrenchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: WrenchIcon,

  fields: [

    //* Branding
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      validation: Rule => Rule.required(),
    }),

    //* Base SEO 
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      description: "Fallback SEO for pages without custom SEO",
      validation: Rule => Rule.required(),
    }),

    //* Open Graph / Social
    defineField({
      name: "social",
      title: "Social Profiles",
      type: "object",
      fields: [
        defineField({ name: "facebook", type: "url" }),
        defineField({ name: "twitter", type: "url" }),
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "youtube", type: "url" }),
      ],
    }),

    //* Contact Info
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "localizedText" }),
      ],
    }),

    //* Legal / Footer
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "localizedText",
    }),

    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "localizedString",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});

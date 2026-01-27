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
      validation: Rule => Rule.required(),
      fields: [
        defineField({ name: "facebook", type: "url", validation: Rule => Rule.required() }),
        defineField({ name: "twitter", type: "url", validation: Rule => Rule.required() }),
        defineField({ name: "linkedin", type: "url", validation: Rule => Rule.required() }),
        defineField({ name: "instagram", type: "url", validation: Rule => Rule.required() }),

      ],
    }),

    //* Contact Info
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      validation: Rule => Rule.required(),
      fields: [
        defineField({ name: "email", type: "string", validation: Rule => Rule.required() }),
        defineField({ name: "phone", type: "string", validation: Rule => Rule.required() }),
        defineField({ name: "address", type: "localizedText", validation: Rule => Rule.required() }),
      ],
    }),

    //* Legal / Footer
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "localizedText",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),

    //* Menu Management
    defineField({
      name: "headerMenu",
      title: "Header Navigation Menu",
      type: "reference",
      to: [{ type: "menu" }],
      description: "Select the menu to display in the website header",
    }),

    defineField({
      name: "footerMenu",
      title: "Footer Navigation Menu",
      type: "reference",
      to: [{ type: "menu" }],
      description: "Select the menu to display in the website footer",
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

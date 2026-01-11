import { defineType, defineField } from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'localizedString',
      title: 'Meta Title',
    }),
    defineField({
      name: 'metaDescription',
      type: 'localizedText',
      title: 'Meta Description',
    }),
    defineField({
      name: 'schema',
      type: 'text',
      title: 'Schema Markup',
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
})

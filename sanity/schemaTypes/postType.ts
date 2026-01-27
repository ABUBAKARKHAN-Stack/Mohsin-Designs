import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'localizedString',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'localizedText',
      title: 'Description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Post',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.en',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      type: 'number',
      title: 'Read Time (minutes)',
    }),
    defineField({
      name: 'author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'localizedArray',
      title: 'Tags',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'reference',
      to: { type: 'location' },
      title: 'Location',
    }),
    defineField({
      name: 'service',
      type: 'reference',
      to: { type: 'service' },
      title: 'Related Service',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'object',
      title: 'Body Content',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({ name: 'en', type: 'blockContent', title: 'English' }),
        defineField({ name: 'ur', type: 'blockContent', title: 'Urdu' }),
        defineField({ name: 'es', type: 'blockContent', title: 'Spanish' }),
        defineField({ name: 'ar', type: 'blockContent', title: 'Arabic' }),
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      author: 'author',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})

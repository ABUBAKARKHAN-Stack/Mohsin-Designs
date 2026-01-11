import { defineField, defineType } from "sanity";
export const localizedString = defineType({
    name: 'localizedString',
    title: 'Localized String',
    type: 'object',
    fields: [
        defineField({
            name: 'en',
            type: 'string',
            title: 'English',
        }),
        defineField({
            name: 'ur',
            type: 'string',
            title: 'Urdu',
        }),
        defineField({
            name: 'es',
            type: 'string',
            title: 'Spanish',
        }),
        defineField({
            name: 'ar',
            type: 'string',
            title: 'Arabic',
        }),
    ],
})


export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      type: 'text',
      rows: 3,
      title: 'English',
    }),
    defineField({
      name: 'ur',
      type: 'text',
      title: 'Urdu',
    }),
    defineField({
      name: 'es',
      type: 'text',
      title: 'Spanish',
    }),
    defineField({
      name: 'ar',
      type: 'text',
      title: 'Arabic',
    }),
  ],
})

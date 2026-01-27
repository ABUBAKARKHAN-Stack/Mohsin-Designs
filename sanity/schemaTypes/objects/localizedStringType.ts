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
  validation: (Rule) => Rule.custom((fields) => {
    if (!fields) return true;
    const missing = ['en', 'ur', 'es', 'ar'].filter(lang => !(fields as any)[lang]);
    if (missing.length > 0) {
      return `Missing translations: ${missing.join(', ').toUpperCase()}`;
    }
    return true;
  })
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
      rows: 3,
    }),
    defineField({
      name: 'es',
      type: 'text',
      title: 'Spanish',
      rows: 3,
    }),
    defineField({
      name: 'ar',
      type: 'text',
      title: 'Arabic',
      rows: 3,
    }),
  ],
  validation: (Rule) => Rule.custom((fields) => {
    if (!fields) return true;
    const missing = ['en', 'ur', 'es', 'ar'].filter(lang => !(fields as any)[lang]);
    if (missing.length > 0) {
      return `Missing translations: ${missing.join(', ').toUpperCase()}`;
    }
    return true;
  })
})

export const localizedArray = defineType({
  name: 'localizedArray',
  title: 'Localized Array',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'English',
    }),
    defineField({
      name: 'ur',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Urdu',
    }),
    defineField({
      name: 'es',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Spanish',
    }),
    defineField({
      name: 'ar',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Arabic',
    }),
  ],
})

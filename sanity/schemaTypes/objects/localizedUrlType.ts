import { defineField, defineType } from "sanity";
export const localizedUrl = defineType({
    name: 'localizedUrl',
    title: 'Localized URL',
    type: 'object',
    fields: [
        defineField({
            name: 'en',
            type: 'url',
            title: 'English URL',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'ur',
            type: 'url',
            title: 'Urdu URL',
            validation: (Rule) => Rule.required()

        }),
        defineField({
            name: 'es',
            type: 'url',
            title: 'Spanish URL',
            validation: (Rule) => Rule.required()

        }),
        defineField({
            name: 'ar',
            type: 'url',
            title: 'Arabic URL',
            validation: (Rule) => Rule.required()
        }),
    ],
})

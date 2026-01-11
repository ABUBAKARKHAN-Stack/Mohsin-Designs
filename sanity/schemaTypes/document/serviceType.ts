import { defineField, defineType } from "sanity";

export const serviceType = defineType({
    name: 'service',
    type: 'document',
    title: 'Service',
    fields: [

        defineField({
            name: 'title',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'subtitle',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title.en' },
            validation: Rule => Rule.required()
        }),

        // Hero
        defineField({
            name: 'heroImage',
            type: 'image',
            title: 'Hero Image',
            validation: Rule => Rule.required(),
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'localizedString',
                    title: 'Alternative text',
                    validation: Rule => Rule.required(),
                })
            ]
        }),

        // Intro Section
        defineField({
            name: 'introTitle',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'introContent',
            type: 'localizedText',
            validation: Rule => Rule.required()
        }),

        // Role Section
        defineField({
            name: 'roleTitle',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'roleContent',
            type: 'array',
            of: [{ type: 'localizedText' }],
            validation: Rule => Rule.min(1).error('At least one role description is required')
        }),

        // How We Help
        defineField({
            name: 'howWeHelpTitle',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'howWeHelpPoints',
            type: 'array',
            validation: Rule => Rule.min(1).error('Add at least one help point'),
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'title',
                        type: 'localizedString',
                        validation: Rule => Rule.required()
                    }),
                    defineField({
                        name: 'description',
                        type: 'localizedText',
                        validation: Rule => Rule.required()
                    }),
                ],
            }],
        }),

        // Overview & Items
        defineField({
            name: 'overview',
            type: 'localizedText',
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'items',
            type: 'array',
            of: [{ type: 'localizedString' }],
            validation: Rule => Rule.min(1)
        }),

        // Benefits
        defineField({
            name: 'benefits',
            type: 'array',
            of: [{ type: 'localizedString' }],
            validation: Rule => Rule.min(1)
        }),

        // Why Choose Us
        defineField({
            name: 'whyChooseUsPoints',
            type: 'array',
            validation: Rule => Rule.min(1),
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'title',
                        type: 'localizedString',
                        validation: Rule => Rule.required()
                    }),
                    defineField({
                        name: 'description',
                        type: 'localizedText',
                        validation: Rule => Rule.required()
                    }),
                ],
            }],
        }),

        // Process
        defineField({
            name: 'process',
            type: 'array',
            validation: Rule => Rule.min(1),
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'step',
                        type: 'string',
                        validation: Rule => Rule.required()
                    }),
                    defineField({
                        name: 'title',
                        type: 'localizedString',
                        validation: Rule => Rule.required()
                    }),
                    defineField({
                        name: 'desc',
                        type: 'localizedText',
                        validation: Rule => Rule.required()
                    }),
                ],
            }],
        }),

        // Industries
        defineField({
            name: 'industries',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'name',
                        type: 'localizedString',
                        validation: Rule => Rule.required()
                    }),
                    defineField({
                        name: 'description',
                        type: 'localizedText',
                        validation: Rule => Rule.required()
                    }),
                ],
            }],
        }),

        // Case Studies
        defineField({
            name: 'caseStudies',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'title', type: 'localizedString', validation: Rule => Rule.required() }),
                    defineField({ name: 'problem', type: 'localizedText', validation: Rule => Rule.required() }),
                    defineField({ name: 'solution', type: 'localizedText', validation: Rule => Rule.required() }),
                    defineField({ name: 'result', type: 'localizedText', validation: Rule => Rule.required() }),
                ],
            }],
        }),

        // Areas
        defineField({
            name: 'areas',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'region', type: 'localizedString', validation: Rule => Rule.required() }),
                    defineField({
                        name: 'locations',
                        type: 'array',
                        of: [{ type: 'localizedString' }],
                        validation: Rule => Rule.min(1)
                    }),
                    defineField({ name: 'featured', type: 'boolean' }),
                    defineField({
                        name: 'clients',
                        type: 'number',
                        validation: Rule => Rule.min(0)
                    }),
                    defineField({ name: 'flag', type: 'string' }),
                ],
            }],
        }),

        // FAQs
        defineField({
            name: 'faqs',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'question', type: 'localizedString', validation: Rule => Rule.required() }),
                    defineField({ name: 'answer', type: 'localizedText', validation: Rule => Rule.required() }),
                ],
            }],
        }),

        defineField({
            name: 'seo',
            type: 'seo',
            validation: Rule => Rule.required()
        }),
    ],

    preview: {
        select: {
            title: 'title.en',
            subtitle: 'subtitle.en',
            media: 'heroImage',
        },
        prepare({ title, subtitle, media, }) {
            return {
                title: title || 'Untitled Service',
                subtitle,
                media,
            };
        },
    },

});

import { CaseIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    icon: CaseIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'localizedString',
            title: 'Project Title',
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
            name: 'category',
            type: 'localizedString',
            title: 'Short Category',
            description: 'e.g., Brand, Digital, UI/UX (Single word preferred for cards)',
        }),
        defineField({
            name: 'description',
            type: 'localizedText',
            title: 'Short Description',
            description: 'Short summary for the project listing cards.',
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
            name: 'caseStudy',
            type: 'object',
            title: 'Case Study Details',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                defineField({
                    name: 'title',
                    type: 'localizedString',
                    title: 'Case Study Title',
                }),
                defineField({
                    name: 'category',
                    type: 'localizedString',
                    title: 'Full Category/Services',
                    description: 'e.g., Brand Identity + Web Design',
                }),
                defineField({
                    name: 'beforeImage',
                    type: 'image',
                    title: 'Before Image',
                }),
                defineField({
                    name: 'afterImage',
                    type: 'image',
                    title: 'After Image',
                }),
                defineField({
                    name: 'testimonial',
                    type: 'localizedText',
                    title: 'Client Testimonial',
                }),
                defineField({
                    name: 'results',
                    type: 'array',
                    title: 'Project Results/Stats',
                    of: [
                        defineArrayMember({
                            type: 'object',
                            name: 'result',
                            fields: [
                                defineField({
                                    name: 'icon',
                                    type: 'string',
                                    title: 'Icon Name',
                                    description: 'Used by IconSelect in the dashboard.',
                                }),
                                defineField({
                                    name: 'value',
                                    type: 'localizedString',
                                    title: 'Result Value (e.g., +340%)',
                                }),
                                defineField({
                                    name: 'label',
                                    type: 'localizedString',
                                    title: 'Result Label (e.g., Organic Traffic)',
                                }),
                            ],
                            preview: {
                                select: {
                                    title: 'label.en',
                                    subtitle: 'value.en',
                                }
                            }
                        })
                    ]
                }),
                defineField({
                    name: 'slug',
                    type: 'slug',
                    title: 'Case Study Slug',
                    options: {
                        source: (doc: any) => doc.caseStudy?.title?.en || '',
                    },
                }),
            ]
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            subtitle: 'category.en',
            media: 'mainImage',
        },
    },
})

import { defineField, defineType } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export const globalContentType = defineType({
    name: 'globalContent',
    title: 'Global Sections',
    type: 'document',
    icon: EarthGlobeIcon,
    fields: [
        // STATS SECTION
        defineField({
            name: 'stats',
            title: 'Stats Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'projectsDelivered',
                    title: 'Projects Delivered',
                    type: 'object',
                    fields: [
                        defineField({ name: 'value', type: 'localizedString' }),
                        defineField({ name: 'label', type: 'localizedString' }),
                        defineField({
                            name: 'suffix',
                            type: 'string',
                        })
                    ]
                }),
                defineField({
                    name: 'yearsExperience',
                    title: 'Years Experience',
                    type: 'object',
                    fields: [
                        defineField({ name: 'value', type: 'localizedString' }),
                        defineField({ name: 'label', type: 'localizedString' }),
                        defineField({
                            name: 'suffix',
                            type: 'string',
                        })
                    ]
                }),
                defineField({
                    name: 'clientSatisfaction',
                    title: 'Client Satisfaction',
                    type: 'object',
                    fields: [
                        defineField({ name: 'value', type: 'localizedString' }),
                        defineField({ name: 'label', type: 'localizedString' }),
                        defineField({
                            name: 'suffix',
                            type: 'string',
                        })
                    ]
                })
            ]
        }),

        // SERVICES PREVIEW SECTION
        defineField({
            name: 'servicesPreview',
            title: 'Services Preview Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                })
            ]
        }),

        // WHY CHOOSE US SECTION
        defineField({
            name: 'whyChooseUs',
            title: 'Why Choose Us Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                }),
                defineField({
                    name: 'benefits',
                    title: 'Benefits',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title',
                                title: 'Benefit Title',
                                type: 'localizedString',
                            }),
                            defineField({
                                name: 'description',
                                title: 'Benefit Description',
                                type: 'localizedText',
                            }),
                            defineField({
                                name: 'iconName',
                                title: 'Icon Name',
                                type: 'string',
                                description: 'Lucide icon name (e.g., Target, Shield, Award)',
                            })
                        ],
                        preview: {
                            select: {
                                title: 'title.en',
                                icon: 'iconName'
                            },
                            prepare({ title, icon }) {
                                return {
                                    title: title || 'Untitled Benefit',
                                    subtitle: `Icon: ${icon || 'None'}`
                                }
                            }
                        }
                    }]
                })
            ]
        }),

        // OUR APPROACH SECTION
        defineField({
            name: 'ourApproach',
            title: 'Our Approach Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                }),
                defineField({
                    name: 'steps',
                    title: 'Approach Steps',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title',
                                title: 'Step Title',
                                type: 'localizedString',
                            }),
                            defineField({
                                name: 'description',
                                title: 'Step Description',
                                type: 'localizedText',
                            }),
                            defineField({
                                name: 'iconName',
                                title: 'Icon Name',
                                type: 'string',
                                description: 'Lucide icon name',
                            })
                        ],
                        preview: {
                            select: {
                                title: 'title.en',
                                icon: 'iconName'
                            },
                            prepare({ title, icon }) {
                                return {
                                    title: title || 'Untitled Step',
                                    subtitle: `Icon: ${icon || 'None'}`
                                }
                            }
                        }
                    }]
                })
            ]
        }),

        // INDUSTRIES WE SERVE SECTION
        defineField({
            name: 'industriesWeServe',
            title: 'Industries We Serve Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                }),
                defineField({
                    name: 'industries',
                    title: 'Industries',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'name',
                                title: 'Industry Name',
                                type: 'localizedString',
                            }),
                            defineField({
                                name: 'description',
                                title: 'Industry Description',
                                type: 'localizedText'
                            }),
                            defineField({
                                name: 'iconName',
                                title: 'Icon Name',
                                type: 'string',
                                description: 'Lucide icon name',
                            })
                        ],
                        preview: {
                            select: {
                                name: 'name.en',
                                icon: 'iconName'
                            },
                            prepare({ name, icon }) {
                                return {
                                    title: name || 'Untitled Industry',
                                    subtitle: `Icon: ${icon || 'None'}`
                                }
                            }
                        }
                    }]
                })
            ]
        }),

        // LEADERSHIP SECTION
        defineField({
            name: 'leadership',
            title: 'Leadership Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                }),
                defineField({
                    name: 'founder',
                    title: 'Founder Information',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Name',
                            type: 'localizedString',
                        }),
                        defineField({
                            name: 'role',
                            title: 'Role/Title',
                            type: 'localizedString',
                        }),
                        defineField({
                            name: 'image',
                            title: 'Profile Image',
                            type: 'image',
                        }),
                        defineField({
                            name: 'socialLinks',
                            title: 'Social Links',
                            type: 'array',
                            of: [{
                                type: 'object',
                                fields: [
                                    defineField({
                                        name: 'platform',
                                        title: 'Platform',
                                        type: 'string',
                                        options: {
                                            list: [
                                                { title: 'LinkedIn', value: 'linkedin' },
                                                { title: 'Twitter', value: 'twitter' },
                                                { title: 'Email', value: 'email' }
                                            ]
                                        },
                                    }),
                                    defineField({
                                        name: 'url',
                                        title: 'URL',
                                        type: 'url',
                                    })
                                ],
                                preview: {
                                    select: {
                                        platform: 'platform',
                                        url: 'url'
                                    },
                                    prepare({ platform, url }) {
                                        return {
                                            title: platform || 'Social Link',
                                            subtitle: url
                                        }
                                    }
                                }
                            }]
                        })
                    ]
                }),
                defineField({
                    name: 'agencyStructure',
                    title: 'Agency Structure',
                    type: 'array',
                    description: 'Teams/departments in the agency',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title',
                                title: 'Team Title',
                                type: 'localizedString',
                                description: 'e.g., Design Team, Development Team',
                            }),
                            defineField({
                                name: 'description',
                                title: 'Description',
                                type: 'localizedString',
                            }),
                            defineField({
                                name: 'featured',
                                title: 'Featured Industry',
                                type: 'boolean',
                                description: 'Mark this industry as featured',
                                initialValue: false
                            }),
                            defineField({
                                name: 'iconName',
                                title: 'Icon',
                                type: 'string',
                                description: 'Lucide icon name',
                            })
                        ],
                        preview: {
                            select: {
                                title: 'title.en',
                                description: 'description.en',
                                icon: 'iconName'
                            },
                            prepare({ title, description, icon }) {
                                return {
                                    title: title || 'Untitled Team',
                                    subtitle: `${icon || 'No icon'} • ${description || 'No description'}`
                                }
                            }
                        }
                    }]
                })
            ]
        }),

        // CTA SECTION
        defineField({
            name: 'cta',
            title: 'CTA Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'badge',
                    title: 'Badge Text',
                    type: 'localizedString',
                    description: 'e.g., "Available for new projects"',
                }),
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'localizedString',
                    description: 'Main CTA heading',
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'localizedText',
                    description: 'CTA description paragraphs',
                }),
                defineField({
                    name: 'benefits',
                    title: 'Benefits',
                    type: 'array',
                    description: 'List of benefits/features',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'text',
                                title: 'Benefit Text',
                                type: 'localizedString',
                            })
                        ],
                        preview: {
                            select: {
                                text: 'text.en'
                            },
                            prepare({ text }) {
                                return {
                                    title: text || 'Untitled Benefit'
                                }
                            }
                        }
                    }]
                }),
                defineField({
                    name: 'formId',
                    title: 'Contact Form',
                    type: 'reference',
                    to: [{ type: 'form' }],
                    description: 'Select which form to display in the CTA section',
                }),
            ]
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Global Sections Content',
                subtitle: 'Manage shared sections across the site'
            }
        }
    }
});

import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const landingPageContentType = defineType({
    name: 'landingPageContent',
    title: 'Landing Page Content',
    type: 'document',
    icon: HomeIcon,

    fields: [
        // HERO SECTION
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'badge',
                    title: 'Badge Text',
                    type: 'localizedString',
                    description: 'e.g., "Trusted by 3,000+ Businesses"',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'headingLines',
                    title: 'Heading Lines',
                    type: 'array',
                    description: 'Maximum 3 lines for the main heading',
                    validation: Rule => Rule.required().max(3).min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'text',
                                title: 'Line Text',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'style',
                                title: 'Text Style',
                                type: 'string',
                                options: {
                                    list: [
                                        { title: 'Normal', value: 'normal' },
                                        { title: 'Stroke (Outline)', value: 'stroke' },
                                        { title: 'Gradient', value: 'gradient' }
                                    ]
                                },
                                initialValue: 'normal',
                                validation: Rule => Rule.required()
                            })
                        ],
                        preview: {
                            select: {
                                text: 'text.en',
                                style: 'style'
                            },
                            prepare({ text, style }) {
                                return {
                                    title: text || 'Untitled Line',
                                    subtitle: `Style: ${style}`
                                }
                            }
                        }
                    }]
                }),
                defineField({
                    name: 'descriptionParagraphs',
                    title: 'Description Paragraphs',
                    type: 'array',
                    description: 'Maximum 5 paragraphs',
                    validation: Rule => Rule.required().max(5).min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'text',
                                title: 'Paragraph Text',
                                type: 'localizedText',
                                validation: Rule => Rule.required()
                            })
                        ],
                        preview: {
                            select: {
                                text: 'text.en'
                            },
                            prepare({ text }) {
                                const preview = text ? text.substring(0, 60) + '...' : 'Empty paragraph'
                                return {
                                    title: preview
                                }
                            }
                        }
                    }]
                }),
                defineField({
                    name: 'ctaButtons',
                    title: 'CTA Buttons',
                    type: 'array',
                    description: 'Exactly 2 CTA buttons',
                    validation: Rule => Rule.required().length(2),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'text',
                                title: 'Button Text',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'url',
                                title: 'Button URL',
                                type: 'localizedUrl',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'variant',
                                title: 'Button Style',
                                type: 'string',
                                options: {
                                    list: [
                                        { title: 'Primary (Filled)', value: 'primary' },
                                        { title: 'Secondary (Outline)', value: 'secondary' }
                                    ]
                                },
                                initialValue: 'primary',
                                validation: Rule => Rule.required()
                            })
                        ],
                        preview: {
                            select: {
                                text: 'text.en',
                                variant: 'variant'
                            },
                            prepare({ text, variant }) {
                                return {
                                    title: text || 'Untitled Button',
                                    subtitle: variant === 'primary' ? 'Primary Button' : 'Secondary Button'
                                }
                            }
                        }
                    }]
                }),
            ]
        }),

        // STATS SECTION
        defineField({
            name: 'stats',
            title: 'Stats Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'projectsDelivered',
                    title: 'Projects Delivered',
                    type: 'object',
                    fields: [
                        defineField({ name: 'value', type: 'string' }),
                        defineField({ name: 'label', type: 'localizedString' }),
                        defineField({
                            name: 'suffix',
                            type: 'string',
                            validation: Rule => Rule.required()
                        })
                    ]
                }),
                defineField({
                    name: 'yearsExperience',
                    title: 'Years Experience',
                    type: 'object',
                    fields: [
                        defineField({ name: 'value', type: 'string' }),
                        defineField({ name: 'label', type: 'localizedString' }),
                        defineField({
                            name: 'suffix',
                            type: 'string',
                            validation: Rule => Rule.required()
                        })
                    ]
                }),
                defineField({
                    name: 'clientSatisfaction',
                    title: 'Client Satisfaction',
                    type: 'object',
                    fields: [
                        defineField({ name: 'value', type: 'string' }),
                        defineField({ name: 'label', type: 'localizedString' }),
                        defineField({
                            name: 'suffix',
                            type: 'string',
                            validation: Rule => Rule.required()
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
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                })
            ]
        }),

        // PORTFOLIO PREVIEW SECTION
        defineField({
            name: 'portfolioPreview',
            title: 'Portfolio Preview Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                })
            ]
        }),

        // ABOUT PREVIEW SECTION
        defineField({
            name: 'aboutPreview',
            title: 'About Preview Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'leftDescriptions',
                    title: 'Left Side Descriptions',
                    type: 'array',
                    description: 'Exactly 2 paragraphs for the left side',
                    validation: Rule => Rule.required().min(2).max(2),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'text',
                                title: 'Paragraph Text',
                                type: 'localizedText',
                                validation: Rule => Rule.required()
                            })
                        ]
                    }]
                }),
                defineField({
                    name: 'rightDescriptions',
                    title: 'Right Side Descriptions',
                    type: 'array',
                    description: 'Exactly 2 paragraphs for the right side',
                    validation: Rule => Rule.required().min(2).max(2),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'text',
                                title: 'Paragraph Text',
                                type: 'localizedText',
                                validation: Rule => Rule.required()
                            })
                        ]
                    }]
                }),
                defineField({
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'localizedString',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'ctaUrl',
                    title: 'CTA Button URL',
                    type: 'string',
                    description: 'Internal path (e.g., /about)',
                    validation: Rule => Rule.required()
                })
            ]
        }),


        // WHY CHOOSE US SECTION
        defineField({
            name: 'whyChooseUs',
            title: 'Why Choose Us Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'benefits',
                    title: 'Benefits',
                    type: 'array',
                    validation: Rule => Rule.required().min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title',
                                title: 'Benefit Title',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'description',
                                title: 'Benefit Description',
                                type: 'localizedText',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'iconName',
                                title: 'Icon Name',
                                type: 'string',
                                description: 'Lucide icon name (e.g., Target, Shield, Award)',
                                validation: Rule => Rule.required()
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


        // BLOG PREVIEW SECTION
        defineField({
            name: 'blogPreview',
            title: 'Blog Preview Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                })
            ]
        }),

        // FAQS SECTION
        defineField({
            name: 'faqs',
            title: 'FAQs Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'faqItems',
                    title: 'FAQ Items',
                    type: 'array',
                    validation: Rule => Rule.required().min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'question',
                                title: 'Question',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'answer',
                                title: 'Answer',
                                type: 'localizedText',
                                validation: Rule => Rule.required()
                            })
                        ],
                        preview: {
                            select: {
                                question: 'question.en'
                            },
                            prepare({ question }) {
                                return {
                                    title: question || 'Untitled Question'
                                }
                            }
                        }
                    }]
                }),
                defineField({
                    name: 'buttonText',
                    title: 'CTA Button Text (Optional)',
                    type: 'localizedString',
                    description: 'Leave empty to use default "Contact us for more" button'
                }),
                defineField({
                    name: 'buttonUrl',
                    title: 'CTA Button URL (Optional)',
                    type: 'localizedString',
                    description: 'Leave empty to use default /contact URL'
                })
            ]
        }),

        // SERVICE HIGHLIGHTS MARQUEE SECTION
        defineField({
            name: 'serviceHighlightsMarquee',
            title: 'Service Highlights Marquee',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'highlights',
                    title: 'Highlighted Services',
                    type: 'array',
                    description: 'Services to display in the marquee',
                    validation: Rule => Rule.required().min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'text',
                                title: 'Service Text',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
                            })
                        ],
                        preview: {
                            select: {
                                text: 'text.en'
                            },
                            prepare({ text }) {
                                return {
                                    title: text || 'Untitled Service'
                                }
                            }
                        }
                    }]
                })
            ]
        }),

        // TRUSTED BY BRANDS SECTION
        defineField({
            name: 'trustedByBrands',
            title: 'Trusted By Brands Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'brandLogos',
                    title: 'Brand Logos',
                    type: 'array',
                    description: 'Upload brand logos (bulk upload supported)',
                    validation: Rule => Rule.required().min(1),
                    of: [{
                        type: 'image',
                        options: {
                            hotspot: true
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
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'steps',
                    title: 'Approach Steps',
                    type: 'array',
                    validation: Rule => Rule.required().min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title',
                                title: 'Step Title',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'description',
                                title: 'Step Description',
                                type: 'localizedText',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'iconName',
                                title: 'Icon Name',
                                type: 'string',
                                description: 'Lucide icon name',
                                validation: Rule => Rule.required()
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

        // CASE STUDIES PREVIEW SECTION
        defineField({
            name: 'caseStudiesPreview',
            title: 'Case Studies Preview Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                })
            ]
        }),

        // AREAS WE SERVE SECTION
        defineField({
            name: 'areasWeServe',
            title: 'Areas We Serve Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'areas',
                    title: 'Regions',
                    type: 'array',
                    validation: Rule => Rule.required().min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'region',
                                title: 'Region Name',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'locations',
                                title: 'Locations/Cities',
                                type: 'array',
                                description: 'List of cities or locations in this region',
                                of: [{ type: 'localizedString' }],
                                validation: Rule => Rule.min(1)
                            }),
                            defineField({
                                name: 'featured',
                                title: 'Featured Region',
                                type: 'boolean',
                                description: 'Mark this region as featured',
                                initialValue: false
                            }),
                            defineField({
                                name: 'clients',
                                title: 'Number of Clients',
                                type: 'number',
                                description: 'Total clients served in this region',
                                validation: Rule => Rule.min(0)
                            }),
                            defineField({
                                name: 'flag',
                                title: 'Flag Emoji',
                                type: 'string',
                                description: 'Country/region flag emoji (e.g., 🇺🇸, 🇬🇧, 🇵🇰)',
                                validation: Rule => Rule.max(10)
                            })
                        ],
                        preview: {
                            select: {
                                region: 'region.en',
                                flag: 'flag',
                                featured: 'featured',
                                clients: 'clients'
                            },
                            prepare({ region, flag, featured, clients }) {
                                return {
                                    title: `${flag || '🌍'} ${region || 'Untitled Region'}`,
                                    subtitle: `${featured ? '⭐ Featured • ' : ''}${clients || 0} clients`
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
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'industries',
                    title: 'Industries',
                    type: 'array',
                    validation: Rule => Rule.required().min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'name',
                                title: 'Industry Name',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
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
                                validation: Rule => Rule.required()
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

        // TESTIMONIALS SECTION
        defineField({
            name: 'testimonials',
            title: 'Testimonials Section',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'testimonials',
                    title: 'Testimonials',
                    type: 'array',
                    validation: Rule => Rule.required().min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'quote',
                                title: 'Quote',
                                type: 'localizedText',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'author',
                                title: 'Author Name',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'role',
                                title: 'Author Role',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'company',
                                title: 'Company',
                                type: 'localizedString'
                            }),
                            defineField({
                                name: 'avatar',
                                title: 'Avatar Image',
                                type: 'image'
                            })
                        ],
                        preview: {
                            select: {
                                author: 'author.en',
                                role: 'role.en',
                                media: 'avatar'
                            },
                            prepare({ author, role, media }) {
                                return {
                                    title: author || 'Untitled Testimonial',
                                    subtitle: role,
                                    media
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
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'sectionHeading',
                    title: 'Section Heading',
                    type: 'sectionHeading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'founder',
                    title: 'Founder Information',
                    type: 'object',
                    validation: Rule => Rule.required(),
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Name',
                            type: 'localizedString',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'role',
                            title: 'Role/Title',
                            type: 'localizedString',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'image',
                            title: 'Profile Image',
                            type: 'image',
                            validation: Rule => Rule.required()
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
                                        validation: Rule => Rule.required()
                                    }),
                                    defineField({
                                        name: 'url',
                                        title: 'URL',
                                        type: 'url',
                                        validation: Rule => Rule.required()
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
                    validation: Rule => Rule.required().min(1),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title',
                                title: 'Team Title',
                                type: 'localizedString',
                                description: 'e.g., Design Team, Development Team',
                                validation: Rule => Rule.required()
                            }),
                            defineField({
                                name: 'description',
                                title: 'Description',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
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
                                validation: Rule => Rule.required()
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
            validation: Rule => Rule.required(),
            fields: [
                defineField({
                    name: 'badge',
                    title: 'Badge Text',
                    type: 'localizedString',
                    description: 'e.g., "Available for new projects"',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'localizedString',
                    description: 'Main CTA heading',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'localizedText',
                    description: 'CTA description paragraphs',
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'benefits',
                    title: 'Benefits',
                    type: 'array',
                    description: 'List of benefits/features',
                    validation: Rule => Rule.required().min(1).max(5),
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'text',
                                title: 'Benefit Text',
                                type: 'localizedString',
                                validation: Rule => Rule.required()
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
                title: 'Landing Page Content',
                subtitle: 'Manage all landing page sections'
            }
        }
    }
});

import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const menuItemType = defineType({
    name: 'menuItem',
    title: 'Menu Item',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description (Optional)',
            type: 'localizedString',
            initialValue: { en: "", ur: "", es: "", ar: "" }
        }),
        defineField({
            name: 'type',
            title: 'Link Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Reference (Service/Page)', value: 'reference' },
                    { title: 'Custom URL', value: 'custom' },
                ],
                layout: 'radio'
            },
            initialValue: 'reference',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'reference',
            title: 'Reference',
            type: 'reference',
            to: [{ type: 'service' }, { type: 'page' }],
            hidden: ({ parent }) => parent?.type !== 'reference'
        }),
        defineField({
            name: 'url',
            title: 'Custom URL',
            type: 'localizedString',
            description: 'Enter a full URL or a relative path (e.g. /about)',
            hidden: ({ parent }) => parent?.type !== 'custom'
        }),
        defineField({
            name: 'children',
            title: 'Sub-menu Items',
            type: 'array',
            of: [{ type: 'menuItem' }]
        })
    ],
    preview: {
        select: {
            title: 'label.en',
            type: 'type',
            serviceTitle: 'reference.title.en',
            pageTitle: 'reference.title.en'
        },
        prepare({ title, type, serviceTitle, pageTitle }) {
            const subtitle = type === 'reference'
                ? `Link to: ${serviceTitle || pageTitle || 'Unknown Reference'}`
                : 'Custom URL';
            return {
                title: title || "Untitled Menu Item",
                subtitle,
                icon: LinkIcon
            };
        }
    }
});

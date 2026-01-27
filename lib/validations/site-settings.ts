import { z } from "zod";
import {
    requiredLocalizedStringSchema,
    localizedStringSchema,
    requiredLocalizedTextSchema,
    localizedTextSchema,
    strictMultiLanguageSchema,
    strictMultiLanguageTextSchema,
    seoSchema,
    baseLocalizedStringSchema
} from "./common";

export const siteSettingsSchema = z.object({
    siteName: requiredLocalizedStringSchema,
    tagline: requiredLocalizedStringSchema,

    logo: z.object({
        _type: z.literal('image').optional(),
        asset: z.object({
            _type: z.literal('reference').optional(),
            _ref: z.string().optional(),
        }).optional(),
        url: z.string().optional(),
    }).optional().nullable(),

    favicon: z.object({
        _type: z.literal('image').optional(),
        asset: z.object({
            _type: z.literal('reference').optional(),
            _ref: z.string().optional(),
        }).optional(),
        url: z.string().optional(),
    }).optional().nullable(),

    // Local strict SEO schema to enforce requirements
    seo: z.object({
        metaTitle: requiredLocalizedStringSchema,
        metaDescription: requiredLocalizedTextSchema,
        schema: z.string().optional(),
        keywords: z.array(baseLocalizedStringSchema).optional().default([]),
    }),

    social: z.object({
        facebook: z.string().url("Must be a valid URL"),
        twitter: z.string().url("Must be a valid URL"),
        linkedin: z.string().url("Must be a valid URL"),
        instagram: z.string().url("Must be a valid URL"),

    }),

    contact: z.object({
        email: z.string().email("Must be a valid email"),
        phone: z.string().min(1, "Phone number is required"),
        address: requiredLocalizedTextSchema,
    }),

    footerText: requiredLocalizedTextSchema,
    copyright: requiredLocalizedStringSchema,

    headerMenu: z.object({
        _type: z.literal('reference').optional(),
        _ref: z.string().optional(),
    }).optional().nullable(),

    footerMenu: z.object({
        _type: z.literal('reference').optional(),
        _ref: z.string().optional(),
    }).optional().nullable(),
});

export type SiteSettingsValues = z.infer<typeof siteSettingsSchema>;

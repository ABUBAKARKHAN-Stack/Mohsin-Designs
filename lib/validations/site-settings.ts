import { z } from "zod";
import {
    requiredLocalizedStringSchema,
    localizedStringSchema,
    requiredLocalizedTextSchema,
    localizedTextSchema,
    strictMultiLanguageSchema,
    strictMultiLanguageTextSchema,
    seoSchema
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

    seo: seoSchema,

    social: z.object({
        facebook: z.string().url("Must be a valid URL").optional().or(z.literal("")),
        twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
        linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
        instagram: z.string().url("Must be a valid URL").optional().or(z.literal("")),
        youtube: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    }).optional(),

    contact: z.object({
        email: z.string().email("Must be a valid email").optional().or(z.literal("")),
        phone: z.string().optional().or(z.literal("")),
        address: strictMultiLanguageTextSchema.optional(),
    }).optional(),

    footerText: strictMultiLanguageTextSchema.optional(),
    copyright: strictMultiLanguageSchema.optional(),
});

export type SiteSettingsValues = z.infer<typeof siteSettingsSchema>;

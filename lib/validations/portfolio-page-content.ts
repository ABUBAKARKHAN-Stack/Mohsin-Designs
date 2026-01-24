import { z } from "zod";
import { requiredLocalizedStringSchema, requiredLocalizedTextSchema, localizedStringSchema, localizedTextSchema } from "./common";

const sectionHeadingSchema = z.object({
    eyebrow: requiredLocalizedStringSchema.optional(),
    title: requiredLocalizedStringSchema,
    description: requiredLocalizedTextSchema.optional(),
});

export const portfolioPageContentSchema = z.object({
    hero: z.object({
        title: requiredLocalizedStringSchema,
        subtitle: requiredLocalizedStringSchema,
        description: requiredLocalizedTextSchema,
    }),
    portfolioList: z.object({
        projects: z.array(z.string()).min(1, "Select at least one project"), // Array of IDs, allows empty
    }),
    cta: z.object({
        sectionHeading: sectionHeadingSchema.optional(),
        formReference: z.string().optional(),
    }).optional(),
});

export type PortfolioPageContentValues = z.infer<typeof portfolioPageContentSchema>;

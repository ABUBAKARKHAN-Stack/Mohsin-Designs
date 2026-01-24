import { z } from "zod";
import { requiredLocalizedStringSchema, localizedTextSchema } from "./common";

export const categorySchema = z.object({
    title: requiredLocalizedStringSchema,
    description: localizedTextSchema.optional(),
});

export type CategoryValues = z.infer<typeof categorySchema>;

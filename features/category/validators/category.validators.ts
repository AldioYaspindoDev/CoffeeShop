import z from "zod";

export const CreatedCategorySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    icon: z.string().min(1)
});

export type CreatedCategoryDto = z.infer<typeof CreatedCategorySchema>
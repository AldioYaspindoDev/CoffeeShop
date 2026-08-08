import z from "zod";

export const CreatedCategorySchema = z.object({
    name: z.string().min(1),
    icon: z.string().optional()
});

export const UpdatedCategorySchema = CreatedCategorySchema.partial();

export type CreatedCategoryDto = z.infer<typeof CreatedCategorySchema>
export type UpdatedCategoryDto = z.infer<typeof UpdatedCategorySchema>
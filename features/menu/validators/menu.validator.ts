import z from "zod";

export const CreatedMenuSchema = z.object({
    categoryId: z.string().min(1),
    images: z.string().url(),
    productName: z.string().min(3),
    productDescription: z.string().min(5),
    productPricing: z.number().positive(),
    stock: z.number().min(0),
    isAvailable: z.boolean(),
    isBestSeller: z.boolean()
});

export const UpdatedMenuSchema = CreatedMenuSchema.partial();

export type CreatedMenuDto = z.infer<typeof CreatedMenuSchema>
export type UpdatedMenuDto = z.infer<typeof UpdatedMenuSchema>
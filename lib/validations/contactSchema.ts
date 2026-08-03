import { z } from "zod"

/**
 * Zod validation schema for the contact form.
 * Use this in POST /api/contact to validate the request body.
 */
export const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Nama minimal 2 karakter")
        .max(100, "Nama maksimal 100 karakter"),
    email: z
        .string()
        .email("Format email tidak valid"),
    message: z
        .string()
        .min(10, "Pesan minimal 10 karakter")
        .max(1000, "Pesan maksimal 1000 karakter"),
})

export type ContactFormData = z.infer<typeof contactSchema>

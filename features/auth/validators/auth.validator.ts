import z from "zod";

export const RequestOtpSchema = z.object({
    name: z.string().min(3, "username minimal 3 karakter").max(100, "username maximal 100 karakter"),
    phone: z.string().min(10, "nomor whatsapp tidak valid").max(15, "nomor whatsapp tidak valid")
});

export const VerifyOtpSchema = z.object({
    phone: z.string().min(10, "nomor whatsapp tidak valid").max(15, "nomor whatsapp tidak valid"),
    code: z.string().regex(/^\d{6}$/, "OTP harus terdiri dari 6 digit")
})

export type RequestOtpDto = z.infer<typeof RequestOtpSchema>
export type VerifyOtpDto = z.infer<typeof VerifyOtpSchema>
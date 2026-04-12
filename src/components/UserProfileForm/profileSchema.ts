import * as z from "zod";

export const profileSchema = z.object({
  nickname: z.string().min(2, "Minimum 2 characters required").regex(/^\S+$/, "Spaces are not allowed"),
  bio: z
    .string()
    .min(5, "Tell us a bit more about yourself")
    .refine((val) => (val.trim().match(/\S+/g)?.length || 0) <= 100, "Maximum 100 words allowed"),

  website: z
    .string()
    .min(1, "Website is required")
    .regex(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i, "Invalid URL format (e.g., example.com)"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

import { z } from "zod";

export const testimonialSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    desc: z.string().min(1, { message: "Description is required" }),
    social: z.string().min(2),
    jobs: z.string().min(1, { message: "Jobs field is required" }),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

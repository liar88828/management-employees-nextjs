import { z } from "zod";
import { PropertyMap } from "@/interface/types";

export type TestimonialFormState = {
    prev: PropertyMap<TestimonialInput>
    errors?: {
        name?: string[]
        desc?: string[]
        social?: string[]
        jobs?: string[]
    }
    message: string
} | undefined

export const testimonialSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    desc: z.string().min(1, { message: "Description is required" }),
    social: z.string(),
    jobs: z.string().min(1, { message: "Jobs field is required" }),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

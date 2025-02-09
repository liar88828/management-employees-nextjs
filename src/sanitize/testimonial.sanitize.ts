import { PropertyMap } from "@/interface/types";
import { TestimonialInput } from "@/validation/testimonial.valid";

export function testimonialSanitize(formData: FormData): PropertyMap<TestimonialInput> & {
    method: | "POST" | "PUT" | string,
    id: number
} {

    return {
        name: formData.get('name') ?? '',
        social: formData.get('desc') ?? '',
        desc: formData.get('social') ?? '',
        jobs: formData.get('jobs') ?? '',
        method: String(formData.get('method')) ?? '',
        id: Number(formData.get('id')) ?? 0,
    }
}

export function sanitizedTestimonialID(formData: FormData) {
    console.log(formData)
    return {
        id: Number(formData.get('id'))
    }
}
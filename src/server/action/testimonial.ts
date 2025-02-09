'use server'
import { redirect } from "next/navigation";
import { testimonialRepository } from "@/server/controller";
import { sanitizedTestimonialID, testimonialSanitize } from "@/sanitize/testimonial.sanitize";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/config/prisma";
import { TestimonialFormState } from "@/validation/testimonial.valid";

export async function testimonialUpsertAction(_prev: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
    const formRaw = testimonialSanitize(formData);
    try {
        if (formRaw.method === 'POST') {
            await testimonialRepository.createOne(formRaw)
        } else if (formRaw.method === 'PUT' && formRaw.id) {
            await testimonialRepository.updateOne(formRaw, formRaw.id)
        }
        redirect(`/admin/testimonial`)
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        if (error instanceof ZodError) {
            return {
                message: 'Validation failed',
                prev: formRaw,
                errors: error.flatten().fieldErrors
            }
        }

        if (error instanceof Error) {
            return {
                message: 'Something Error failed',
                prev: formRaw,
            }
        }

    }
}

export async function testimonialDeleteAction(_prev: TestimonialFormState, formData: FormData): Promise<any> {
    const { id } = sanitizedTestimonialID(formData);
    try {
        await testimonialRepository.deleteOne(id)
        revalidatePath('/')
        redirect(`/admin/testimonial`)
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof Error) {
            return {
                message: 'Something Error failed',
            }
        }

    }
}

export async function ceremonyFindAll({ query, page }: { query: string, page: number }) {
    // Handle search and pagination
    const totalProfiles = await prisma.testimonials.count({
        where: {
            ...(query && {
                name: { contains: query }
            })
        }
    });

    // Extract page query from the context
    const limit = 10; // Number of items per page
    const offset = (page - 1) * limit;
    const profiles = await prisma.testimonials.findMany({
        where: {
            ...(query && {
                name: { contains: query }
            })
        },
        skip: offset,
        take: limit
    });

    const totalPages = Math.ceil(totalProfiles / limit);
    return { profiles, totalPages };
}

export async function testimonialLandingPage() {
    return prisma.testimonials.findMany({
        take: 3
    });

}

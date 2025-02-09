import { prisma } from "@/config/prisma";
import { InterfaceRepository, ParamsApi } from "@/interface/server/InterfaceRepository";
import { z } from "zod";
import { TestimonialInput, testimonialSchema } from "@/validation/testimonial.valid";

// getAll data from database
export default class TestimonialRepository implements InterfaceRepository<TestimonialInput> {
    findAll({ pagination: { limit } }: ParamsApi<object>): Promise<any> {
        limit = z.number().parse(limit)
        return prisma.testimonials.findMany({ take: limit });
    }

    findById(id: number) {
        id = z.number().parse(id)
        return prisma.testimonials.findUnique({ where: { id } });
    }

    createOne(data: { name: string; desc: string; social: string; jobs: string; }): Promise<any> {
        data = testimonialSchema.parse(data)
        return prisma.testimonials.create({ data });
    }

    updateOne(data: { name: string; desc: string; social: string; jobs: string; }, id: number): Promise<any> {
        id = z.number().parse(id)
        data = testimonialSchema.parse(data)
        return prisma.testimonials.update({
            where: { id },
            data
        });
    }

    deleteOne(id: number): Promise<any> {
        id = z.number().parse(id)
        return prisma.testimonials.delete({ where: { id } });
    }

}
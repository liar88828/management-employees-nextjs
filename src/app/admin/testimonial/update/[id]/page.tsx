import { testimonialRepository } from "@/server/controller";
import { TestimonialForm } from "@/app/admin/testimonial/testimonialForm";

export default async function EditProfile(context: { params: Promise<{ id: string }> }) {
    const ceremony = await testimonialRepository.findById(Number((await context.params).id));
    if (!ceremony) return <div>Ceremony not found</div>;
    return (
        <TestimonialForm method={ 'PUT' } defaultValue={ ceremony }/>

    );
}

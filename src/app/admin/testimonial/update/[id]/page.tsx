import { testimonialRepository } from "@/server/controller";
import { TestimonialForm } from "@/app/admin/testimonial/testimonialForm";
import { getContextParamNum } from "@/utils/requestHelper";
import { TContext } from "@/interface/server/param";

export default async function EditProfile(context: TContext) {
    const ceremony = await testimonialRepository.findById(await getContextParamNum(context, 'id'));
    if (!ceremony) return <div>Ceremony not found</div>;
    return (
        <TestimonialForm method={ 'PUT' } defaultValue={ ceremony }/>
    );
}

'use client'
import { Search, Trash } from "lucide-react";
import { useActionState } from "react";
import Form from "next/form";
import { useFormStatus } from "react-dom";
import { testimonialDeleteAction } from "@/server/action/testimonial";

export function DeleteTestimonial({ id }: { id: number }) {
    const [ state, action, pending ] = useActionState(testimonialDeleteAction, undefined);
    return <form action={ action } className="inline">
        <input type="hidden" value={ id } name={ "id" }/>
        <button
            disabled={ pending }
            type="submit" className="btn btn-sm btn-error ml-2 btn-square">
            <Trash/>
        </button>
    </form>;
}

export default function TestimonialSearch() {
    const status = useFormStatus()
    return (
        <Form action="/admin/testimonial" className={ 'join' }>
            <input name="query" className={ 'input input-bordered join-item' }/>
            <button
                className={ 'join-item btn btn-square btn-neutral' }
                disabled={ status.pending }
                type="submit">
                <Search/>
            </button>

        </Form>
    )
}
'use client'
import Form from "next/form";
import { Plus, Search, Trash } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { testimonialDeleteAction } from "@/server/action/testimonial";
import Link from "next/link";

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

export function TestimonialSearch({ query }: { query: string }) {
    const status = useFormStatus()
    return (
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Profiles</h1>
            <div className="flex justify-center gap-2">
                <Form action="/admin/testimonial" className={ 'join' }>
                    <input
                        name="query"
                        className={ 'input input-bordered join-item' }
                        defaultValue={ query }/>
                    <button
                        className={ 'join-item btn btn-square btn-neutral' }
                        disabled={ status.pending }
                        type="submit">
                        <Search/>
                    </button>
                </Form>
                <Link href="/admin/testimonial/create" className="btn btn-primary mb-4 btn-square join-item">
                    <Plus/>
                </Link>
            </div>
        </div>
    )
}
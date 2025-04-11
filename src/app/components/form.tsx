import { useFormImage } from "@/hook/useFormImage";
import React from "react";

export const FormError: React.FC<{
    errors?: string[]; // Array of error messages
    title?: string; // Optional title for the error list
}> = ({ errors, title = "Please address the following errors:" }) => {
    if (!errors || errors.length === 0) return null;

    return (
        <div className="mt-2 text-red-500 text-sm">
            <p>{ title }</p>
            <ul className="list-disc list-inside">
                { errors.map((error, index) => (
                    <li key={ index }>{ error }</li>
                )) }
            </ul>
        </div>
    );
};

export function MyInput({ title, error, defaultValue }: { defaultValue?: string | number, title: string, error: any }) {
    return (
        <div className="form-control w-full">
            <label htmlFor={ `${ title }` } className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <input
                defaultValue={ defaultValue }
                id={ `${ title }` }
                name={ `${ title }` }
                placeholder={ `Enter your ${ title }` }
                className="input input-bordered w-full"
            />
            <FormError errors={ error } title="must add:"/>
        </div>
    );
}

export function MyInputTextArea({ title, error, defaultValue }: {
    defaultValue?: string | number,
    title: string,
    error: any
}) {
    return (
        <div className="form-control w-full">
            <label htmlFor={ `${ title }` } className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <textarea
                defaultValue={ defaultValue }
                id={ `${ title }` }
                name={ `${ title }` }
                placeholder={ `Enter your ${ title }` }
                className="textarea textarea-bordered w-full"
            ></textarea>
            <FormError errors={ error } title="must add:"/>
        </div>
    );
}

export function MyInputNum({ title, error, defaultValue }: {
    defaultValue?: string | number,
    title: string,
    error: any
}) {
    return (
        <div className="form-control w-full">
            <label htmlFor={ `${ title }` } className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <input
                type="number"
                defaultValue={ defaultValue }
                id={ `${ title }` }
                name={ `${ title }` }
                placeholder={ `Enter your ${ title }` }
                className="input input-bordered w-full"
            />
            <FormError errors={ error } title="must add:"/>
        </div>
    );
}

export function MyInputEmail({ title, error, defaultValue }: {
    defaultValue?: string | number,
    title: string,
    error: any
}) {
    return (
        <div className="form-control w-full">
            <label htmlFor={ `${ title }` } className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <input
                type="email"
                defaultValue={ defaultValue }
                id={ `${ title }` }
                name={ `${ title }` }
                placeholder={ `Enter your ${ title }` }
                className="input input-bordered w-full"
            />
            <FormError errors={ error } title="must add:"/>
        </div>
    );
}

export function MyInputDate({ title, error, defaultValue }: {
    defaultValue?: string | number,
    title: string,
    error: any
}) {
    return (

        <div className="form-control w-full">
            <label htmlFor={ `${ title }` } className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <input
                type="datetime-local"
                defaultValue={ defaultValue }
                id={ `${ title }` }
                name={ `${ title }` }
                placeholder={ `Enter your ${ title }` }
                className="input input-bordered w-full"
            />
            <FormError errors={ error } title="must add:"/>
        </div>
    );
}

export function MyInputImage({ title, error, defaultValue }: {
    defaultValue?: string,
    title: string,
    error: any
}) {
    const { previewImage, handleImageChange, } = useFormImage(defaultValue)

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Image { title }</span>
            </label>
            <input
                // value={previewImage}
                type="file"
                name={ "img" }
                onChange={ handleImageChange }
                className="file-input file-input-bordered w-full"
            />
            <FormError errors={ error } title="must add:"/>
            {/* eslint-disable-next-line @next/next/no-img-element */ }
            <img
                src={ previewImage }
                 alt="Image Employee"
                 className="size-40 mt-2 rounded-lg border"
            />
        </div>
    );
}

'use client'
import { useFormImage } from "@/hook/useFormImage";
import React, { ChangeEvent, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Minus, Plus } from "lucide-react";

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

export function MyInputHidden({ keys, value }: { value: string | number, keys: string, }) {
    return (

        <input
            value={ value }
            name={ keys }
            type={ "hidden" }
        />

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

export function InputText({ keys, label }: { keys: string, label: string }) {
    const { register, formState: { errors } } = useFormContext()

    // @ts-ignore
    // const errorMessage = errors[keys].message as string

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{ label }</span>
            </label>
            <input
                { ...register(keys) }
                className="input input-bordered"
                placeholder="Additional notes"
            />
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
        </div>
    );
}

export function InputTextDynamic({ label, keys }: { label: string, keys: string }) {
    const { register, control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: keys
    });

    return (
        <div className="form-control ">
            <div className="flex justify-between mb-1">
                <label className="label items-end ">
                    <span className="label-text">{ label }</span>

                </label>
                <button
                    className="btn btn-info btn-square"
                    type="button"
                    onClick={ () => append({ text: "" }) }
                >
                    <Plus/>
                </button>
            </div>
            <div className="space-y-2">
                { fields.map((item, index) => (
                    <div key={ item.id } className="flex gap-2">
                        <input
                            className="input input-bordered w-full"
                            { ...register(`${ keys }.${ index }.text`) } />
                        <button
                            className={ 'btn btn-error btn-square' }
                            type="button"
                            onClick={ () => remove(index) }
                        >
                            <Minus/>
                        </button>
                    </div>
                )) }
            </div>
        </div>
    );
}

export function InputImage({ img, label }: { img?: string, label: string }) {
    const { register, formState: { errors } } = useFormContext()
    const [ previewImage, setPreviewImage ] = useState<string>(img ? img : "https://dummyimage.com/400x400/000/fff.jpg");
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{ label }</span>
            </label>
            {/* eslint-disable-next-line @next/next/no-img-element */ }
            <img src={ previewImage }
                 alt="Image Employee"
                 className="size-40 mt-2 rounded-lg border"
            />
            <input
                type="file"
                {
                    // @ts-ignore
                    ...register('img',) }
                onChange={ handleImageChange } // Handle image preview
                className="file-input file-input-bordered w-full"
            />
            {/* @ts-ignore */
                errors.img && <p className="text-error text-sm mt-1">{ errors.img.message }</p> }


        </div>
    );
}


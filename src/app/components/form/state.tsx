'use client'
import { useFieldArray, useFormContext } from "react-hook-form";
import React, { ChangeEvent, useState } from "react";
import { Minus, Plus } from "lucide-react";

export function InputImage({ img, title, errorText }: { img?: string, title: string, errorText?: string }) {
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
                <span className="label-text">{ title }</span>

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
            { errorText &&
                <span className="text-error text-sm mt-1">{ errorText }</span>
            }
        </div>
    );
}
export function InputTextDynamic({ title, keys }: { title: string, keys: string }) {
    const { register, control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: keys
    });

    return (
        <div className="form-control ">
            <div className="flex justify-between mb-1">
                <label className="label items-end ">
                    <span className="label-text">{ title }</span>

                </label>
                <button
                    className="btn btn-info btn-square"
                    type="button"
                    onClick={ () => append({ text: "" }) }
                >
                    <Plus />
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
                            <Minus />
                        </button>
                    </div>
                )) }
            </div>
        </div>
    );
}
export function InputText({ keys, title }: { keys: string, title: string }) {
    const { register, formState: { errors } } = useFormContext()

    // @ts-ignore
    // const errorMessage = errors[keys].message as string

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{ title }</span>
            </label>
            <input
                { ...register(keys) }
                className="input input-bordered"
                placeholder={ `Add ${ title }...` }
            />
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
        </div>
    );
}
export function InputDate({ keys, title }: { keys: string, title: string }) {
    const { register, formState: { errors } } = useFormContext()

    // @ts-ignore
    // const errorMessage = errors[keys].message as string

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{ title }</span>
            </label>
            <input
                type={ 'date' }
                { ...register(keys) }
                className="input input-bordered"
                placeholder={ `Add ${ title }...` }
            />
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
        </div>
    );
}

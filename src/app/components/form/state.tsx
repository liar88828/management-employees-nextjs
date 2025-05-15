'use client'
import { useFieldArray, useFormContext } from "react-hook-form";
import React, { ChangeEvent, useState } from "react";
import { ImageIcon, Minus, Plus } from "lucide-react";
import { ModalInput } from "@/app/components/modal";

export function InputImage({ img, title, errorText }: { img?: string, title: string, errorText?: string }) {
    // const [ openImage, setOpenImage ] = useState()
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
            <div className="join">
                <input
                    type="file"
                    {
                        // @ts-ignore
                        ...register('img',) }
                    onChange={ handleImageChange } // Handle image preview
                    className="file-input file-input-bordered w-full join-item"
                />
                <ModalInput
                    active={ !!img }
                    title={ 'image_profile' }
                    buttonText={ <ImageIcon /> }
                >
                    <picture>
                        <img src={ previewImage }
                             alt="Image Employee"
                             className="w-full h-96  mt-2 rounded-lg border object-cover"
                        />
                    </picture>

                </ModalInput>
            </div>
            {/* @ts-ignore */
                errors.img && <p className="text-error text-sm mt-1">{ errors.img.message }</p> }
            { errorText &&
                <span className="text-error text-sm mt-1">{ errorText }</span>
            }
        </div>
    );
}

export function InputTextDynamic(
    {
        title,
        keys
    }: {
        title: string,
        keys: string
    }) {
    const { register, control, formState: { errors } } = useFormContext()
    // console.log(keys)
    const { fields, append, remove, } = useFieldArray({
        control,
        name: keys,

    });
    // console.log(errors);

    // @ts-ignore
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
                    <div key={ item.id }>
                        <div className="flex gap-2">
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
                        {
                            // @ts-ignore
                            errors[keys]?.[index]?.text?.message && (
                                <p className="text-error text-sm mt-1">
                                    {
                                        // @ts-ignore
                                        errors[keys][index]?.text?.message as string }
                                </p>
                            ) }
                    </div>
                )) }
            </div>
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
            { errors[keys] && <p className="text-error text-sm mt-1">{
                // @ts-ignore
                errors[keys].root.message as string }</p> }
        </div>
    );
}

export function InputText(
    {
        keys,
        title,
        isDisable = false
    }: {
        isDisable?: boolean,
        keys: string,
        title: string
    }) {
    const { register, formState: { errors } } = useFormContext()

    // @ts-ignore
    // const errorMessage = errors[keys].message as string

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <input
                { ...register(keys,
                    { disabled: isDisable }
                ) }
                className="input input-bordered"
                placeholder={ `Add ${ title }...` }
            />
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
        </div>
    );
}

export function InputDate(
    {
        keys,
        title,
        now = false
    }: {
        keys: string,
        title: string,
        now?: boolean
    }) {
    const { register, formState: { errors } } = useFormContext()

    // @ts-ignore
    // const errorMessage = errors[keys].message as string
    const today = new Date().toISOString().split('T')[0];
    // const today = new Date().toLocaleDateString('ID-id')

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{ title }  </span>
            </label>
            <input

                type={ 'date' }
                min={ now ? today : undefined }
                { ...register(keys) }
                className="input input-bordered"
                placeholder={ `Add ${ title }...` }
            />
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
        </div>
    );
}

export function InputEmail(
    {
        keys,
        title,
    }: {
        keys: string,
        title: string,
    }) {
    const { register, formState: { errors } } = useFormContext()

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{ title }  </span>
            </label>
            <input

                type={ 'email' }
                { ...register(keys) }
                className="input input-bordered"
                placeholder={ `Add ${ title }...` }
            />
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
        </div>
    );
}

export function InputPassword(
    {
        keys,
        title,
    }: {
        keys: string,
        title: string,
    }) {
    const { register, formState: { errors } } = useFormContext()

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{ title }  </span>
            </label>
            <input

                type={ 'password' }
                { ...register(keys) }
                className="input input-bordered"
                placeholder={ `Add ${ title }...` }
            />
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
        </div>
    );
}

export function InputTextArea(
    {
        keys,
        title
    }: {
        keys: string,
        title: string
    }) {
    const { register, formState: { errors } } = useFormContext()

    // @ts-ignore
    // const errorMessage = errors[keys].message as string

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <textarea
                { ...register(keys) }
                className="textarea textarea-bordered"
                placeholder={ `Add ${ title }...` }
            ></textarea>
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
        </div>
    );
}

export function InputSelect(
    {
        keys,
        title,
        array
    }: {
        keys: string,
        title: string,
        array: string[]
    }) {
    const { register, formState: { errors } } = useFormContext()

    // @ts-ignore
    // const errorMessage = errors[keys].message as string

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <select
                { ...register(keys) }
                className="select select-bordered"
            >
                <option disabled>select { title }</option>
                { array.map((item) => (
                    <option key={ item }>{ item }</option>
                )) }
            </select>
            { errors[keys] && <p className="text-error text-sm mt-1">{ errors[keys].message as string }</p> }
        </div>
    );
}

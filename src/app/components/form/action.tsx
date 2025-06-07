'use client'
import { useFormImage } from "@/hook/useFormImage";
import React, { useState } from "react";

export const FormError: React.FC<{
    errors?: string[]; // Array of errors messages
    title?: string; // Optional title for the errors list
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
            <label htmlFor={ title } className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <input
                defaultValue={ defaultValue }
                id={ title }
                name={ title }
                placeholder={ `Enter your ${ title }` }
                className="input input-bordered w-full"
            />
            <FormError errors={ error } title="must add:" />
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
            <label htmlFor={ title } className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <textarea
                defaultValue={ defaultValue }
                id={ title }
                name={ title }
                placeholder={ `Enter your ${ title }` }
                className="textarea textarea-bordered w-full"
                minLength={ 1 }
                maxLength={ 99 }
            ></textarea>
            <FormError errors={ error } title="must add:" />
        </div>
    );
}

function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
}

export function MyInputNum({
                               title, error, defaultValue,
                               // onChangeAction
                           }: {
    defaultValue?: number,
    title: string,
    error: any,
    // onChangeAction: (value: number) => void,
}) {
    const [ displayValue, setDisplayValue ] = useState(formatRupiah(defaultValue ?? 0));
    const [ rawValue, setRawValue ] = useState(defaultValue);

    function parseRupiah(value: string) {
        return Number(value.replace(/[^0-9]/g, ""));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const numericValue = parseRupiah(input);
        setRawValue(numericValue);
        setDisplayValue(formatRupiah(numericValue));
    };

    return (
        <div className="form-control w-full">
            <label htmlFor={ `${ title }` } className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <input
                type="text"
                value={ displayValue }
                onChange={ handleChange }
                placeholder={ `Enter your ${ title }` }
                className="input input-bordered w-full"
            />
            <input
                defaultValue={ rawValue }
                hidden
                id={ `${ title }` }
                name={ `${ title }` }
            />
            <FormError errors={ error } title="must add:" />
        </div>
    );
}

export function MyInputEmail({ title = 'email', error, defaultValue, onChangeAction }: {
    defaultValue?: string | number,
    title?: string,
    error: any,
    onChangeAction: (value: string) => void
}) {
    return (
        <div className="form-control w-full">
            <label htmlFor={ title } className="label">
                <span className="label-text capitalize">{ title }</span>
            </label>
            <input
                onChange={ e => onChangeAction(e.target.value) }
                value={ defaultValue }
                // defaultValue={ defaultValue }
                type="email"
                id={ title }
                name={ title }
                placeholder={ `Enter your ${ title }` }
                className="input input-bordered w-full"
            />
            <FormError errors={ error } title="must add:" />
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
            <FormError errors={ error } title="must add:" />
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
            <FormError errors={ error } title="must add:" />
            {/* eslint-disable-next-line @next/next/no-img-element */ }
            <img
                src={ previewImage }
                alt="Image Employee"
                className="size-40 mt-2 rounded-lg border"
            />
        </div>
    );
}

export function MyInputOption({ keys, lists, name }: {
    name: string,
    keys: string,
    lists: string[]
}) {
    return (
        <div className="form-control w-full">
            <label htmlFor={ name } className="label">
                <span className="label-text capitalize"> { name }</span>
            </label>
            <select
                className="select select-bordered join-item"
                name={ name }
                key={ keys }
                defaultValue={ keys }
            >
                <option disabled value="">Select Status</option>
                { lists.map((item) => (
                    <option key={ item }>{ item }</option>
                )) }
            </select>
        </div>
    );
}

export function MyInputPassword(props: {
    title: string,
    errors?: string[]
}) {
    return <div className="form-control w-full">
        <label htmlFor={ props.title } className="label">
            <span className="label-text">{ props.title }</span>
        </label>
        <input
            id={ props.title }
            name={ props.title }
            type="password"
            placeholder={ `Enter your ${ props.title }` }
            className="input input-bordered w-full"
            // defaultValue={ state?.prev?.password ??''}
        />
        <FormError errors={ props.errors } title="must Add:" />
    </div>;
}

export function MyInputPhone({ error, defaultValue, title }: {
    defaultValue?: string,
    error?: string[], title: string
}) {
    return (
        <div className="form-control w-full">
            <label htmlFor={ title } className="label">
                <span className="label-text">{ title }</span>
            </label>
            <input
                defaultValue={ defaultValue }
                id={ title }
                name={ title }
                placeholder={ `Enter your ${ title } number` }
                className="input input-bordered w-full"
            />
            <FormError errors={ error } title="must Add:" />
        </div>
    );
}

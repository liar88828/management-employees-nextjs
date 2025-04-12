'use client'
import { i3x4, ktp, TEmployeeDB } from "@/interface/entity/employee.model";
import { TypeFile, uploadFile } from "@/server/action/upload";
import React, { useState } from "react";

export function UploadDocument({ employee, type }: { employee: TEmployeeDB, type: TypeFile }) {
    const [ imagePreview, setImagePreview ] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };

    const uploadImage = uploadFile.bind(null, {
        id: employee.id,
        from: 'employee',
        typeFile: type
    })

    return (
        <div className="card card-bordered " data-theme={ "light" }>
            <div className="card-body">
                <h2 className="card-title">Add { type }
                    { !imagePreview && <p className={ 'text-error ' }> *Please Complete</p> }
                </h2>
                <div className="w-48 h-auto">
                    <div className="mt-4">
                        <p>Image Preview:</p>
                        <ShowImage
                            imagePreview={ imagePreview }
                            type={ type }
                            employee={ employee }
                        />
                    </div>
                </div>

                <form action={ uploadImage } className="form-control">
                    <label className="label">
                        <span className="label-text">Upload a file</span>
                        {/*<input type="hidden"/>*/ }
                    </label>

                    <input
                        className="file-input file-input-bordered w-full"
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={ handleFileChange }
                    />
                    { imagePreview && <button className={ "btn btn-info" } type="submit">Submit</button> }
                </form>
            </div>
        </div>
    )
}

export function ShowImage({ imagePreview, type, employee }: {
    imagePreview: string | null,
    type: TypeFile,
    employee: TEmployeeDB,
}) {
    if (imagePreview) {
        return (
            <>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img src={ imagePreview } alt="Selected file"
                     className="w-40 h-40 object-cover rounded-md border"
                />
            </>

        )
    }
    if (type === "KTP") {
        return <>
            {/* eslint-disable-next-line @next/next/no-img-element */ }
            <img src={ employee.photoKtp ?? ktp }
                 alt="image ktp"
                 className={ "aspect-[4/3] " }
            />
        </>
    }

    if (type === "ijazah")
        return (
            <>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img src={ employee.photoIjasah ?? ktp }
                     alt="image ktp"
                     className={ "aspect-[4/3] " }
                />
            </>
        )

    if (type === "3x4")
        return (
            <>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                <img src={ employee.photo3x4 ?? i3x4 }
                     alt="image 4x3"
                     className={ "aspect-[3/4] " }
                />
            </>
        )
}

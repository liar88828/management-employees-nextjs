import { TypeFile } from "@/server/action/upload";
import { i3x4, ktp, TEmployeeDB } from "@/interface/entity/employee.model";
import React from "react";

function ShowImage({ imagePreview, type, employee }: {
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

export function EmployeePhotoPageAdmin(
    {
        type,
        imagePreview,
        employee,
        action,
        onChange,
    }: {
        type: TypeFile,
        imagePreview: string | null,
        employee: TEmployeeDB,
        action: (formData: FormData) => Promise<void>,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }) {
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

                <form action={ action } className="form-control">
                    <label className="label">
                        <span className="label-text">Upload a file</span>
                        {/*<input type="hidden"/>*/ }
                    </label>

                    <input
                        className="file-input file-input-bordered w-full"
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={ onChange }
                    />

                    <button
                        className={ "btn btn-info" }
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
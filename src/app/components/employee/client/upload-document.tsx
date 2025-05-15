'use client'
import { photoIjazah, photoKtp, TEmployeeDB } from "@/interface/entity/employee.model";
import { TypeFile, uploadFileState } from "@/server/action/upload.action";
import { UserDB } from "@/interface/entity/user.model";
import React, { useState } from "react";
import { ModalInput } from "../../modal";
import { ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

export function UploadDocument(
    {
        user,
        imageData,
        title,

    }: {
        user: UserDB;
        imageData: string | null;
        title: TypeFile;
    }) {
    const [ imagePreview, setImagePreview ] = useState<string | null>(imageData);
    const [ imageFile, setImageFile ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
            setImageFile(file);
        }
    };

    const onHandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent form reload
        setLoading(true);

        if (!imageFile) {
            alert("Please select a file before submitting.");
            return;
        }

        try {
            const response = await uploadFileState({
                userId: user.id,
                from: "employee",
                typeFile: title,
                imageFile: imageFile,
                userName: user.name
            });
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message)
            }
            console.log("Upload success", response);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setLoading(false);

        }
    };
    const imageEmpty = imageData
        ? imageData
        : title === 'ijazah'
            ? photoIjazah
            : photoKtp;
    // console.log(imageData)
    return (
        <form className="form-control" onSubmit={ onHandleSubmit }>
            <label className="label">
                <span className="label-text">Upload a file { title }</span>
            </label>
            <div className="join">
                <input
                    className="file-input file-input-bordered w-full join-item"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={ handleFileChange }
                />
                <ModalInput title={ title } buttonText={ <ImageIcon /> } active={ imageData !== null }>
                    <picture>
                        <img
                            src={ imageEmpty }
                            alt="Uploaded document"
                            className="w-full h-full mt-2 rounded-lg border object-cover"
                        />
                    </picture>
                </ModalInput>
            </div>

            { !imagePreview && (
                <p className="text-error text-sm mt-2">*Please complete this field</p>
            ) }
            { imageFile &&
                imagePreview && (
                    <button
                        disabled={ loading }
                        className="btn btn-info mt-4" type="submit"
                    >
                        Submit
                    </button>
                )
            }
        </form>
    );
}

export function ShowImage({ imagePreview, type, employee }: {
    imagePreview: string | null,
    type: TypeFile,
    employee?: TEmployeeDB,
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
            {/*<img src={ employee.photoKtp ?? photoKtp }*/ }
            {/*     alt="image photoKtp"*/ }
            {/*     className={ "aspect-[4/3] " }*/ }
            {/*/>*/ }
        </>
    }

    if (type === "ijazah")
        return (
            <>
                {/* eslint-disable-next-line @next/next/no-img-element */ }
                {/*<img src={ employee.photoIjazah ?? photoKtp }*/ }
                {/*     alt="image photoKtp"*/ }
                {/*     className={ "aspect-[4/3] " }*/ }
                {/*/>*/ }
            </>
        )

    // if (type === "3x4")
    //     return (
    //         <>
    //             {/* eslint-disable-next-line @next/next/no-img-element */ }
    //             <img src={ employee.photo3x4 ?? i3x4 }
    //                  alt="image 4x3"
    //                  className={ "aspect-[3/4] " }
    //             />
    //         </>
    //     )
}

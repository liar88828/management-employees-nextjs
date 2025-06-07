'use client'
import { TypeFile, uploadFileState } from "@/action/upload.action";
import React, { useState } from "react";
import { ModalInput } from "./modal";
import { ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { url_fastapi } from "@/config/nextPublicBaseUrl";
import { ImageStream } from "@/app/components/ui/imageStream";
import { LoadingSpin } from "@/app/components/ui/LoadingData";
import { photoIjazah, photoKtp, UserClient, UserDB } from "@/interface/model";

export function UploadDocument(
    {
        user,
        imageData,
        title,
    }: {
        user: UserDB | UserClient;
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
                setImageFile(null)
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
        : title === 'Ijazah'
            ? photoIjazah
            : photoKtp;
    // console.log(imageData)
    const image_document = `${ url_fastapi }${ imageEmpty }`
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
                    <picture className={ 'flex  justify-center' }>
                        <ImageStream filename={ image_document }
                                     imgPass={ user.imgPass }
                                     classNames={ 'w-96 h-auto  mt-2 rounded-lg border object-cover' }
                        />
                        {/*<img*/ }
                        {/*    src={ image_document }*/ }
                        {/*    alt="Uploaded document"*/ }
                        {/*    className="w-96 h-auto  mt-2 rounded-lg border object-cover"*/ }
                        {/*/>*/ }
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
                        { loading ? <LoadingSpin /> : <div>Submit</div> }
                    </button>
                )
            }
        </form>
    );
}

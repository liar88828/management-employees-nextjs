import { ChangeEvent, useState } from "react";

export const useFormImage = (image?: string) => {
    const [ previewImage, setPreviewImage ] = useState<string>(image ? `${ image }` : "https://dummyimage.com/400x400/000/fff.jpg");
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    return { previewImage, setPreviewImage, handleImageChange }
}
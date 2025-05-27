'use client'
import React, { useEffect, useState } from "react";
import { url_fastapi } from "@/config/nextPublicBaseUrl";

interface ImageViewerProps {
    filename: string;
}

function Page() {
    return (
        <ImageStream filename={ '/images/f54ad6d8-553b-4a20-90af-7b53052251b1_Febrian Alif Hermawan_KTP.jpg.enc' } /> );
}

export default Page;
const ImageStream: React.FC<ImageViewerProps> = ({ filename }) => {
    const [ imageSrc, setImageSrc ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        if (!filename) return;

        let isMounted = true; // To avoid state update after unmount
        let objectUrl: string | null = null;

        fetch(
            `${ url_fastapi }${ filename }`,
            { method: "GET" }
        )
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch image");
            return res.blob();
        })
        .then((blob) => {
            if (!isMounted) return;
            objectUrl = URL.createObjectURL(blob);
            setImageSrc(objectUrl);
        })
        .catch((err: unknown) => {
            if (!isMounted) return;
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        });

        return () => {
            isMounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [ filename ]);

    if (error) return <div>Error: { error }</div>;
    if (!imageSrc) return <div>Loading...</div>;

    return <img src={ imageSrc } alt={ filename } style={ { maxWidth: "100%" } } />;
};

import React, { HTMLAttributes, useEffect, useState } from "react";
import { LoadingSpin } from "@/app/components/LoadingData";
export const ImageStream: React.FC<{
    filename: string;
    classNames: HTMLAttributes<string>['className']
}> = ({ filename, classNames }) => {
    const [ imageSrc, setImageSrc ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        if (!filename) return;
        let isMounted = true; // To avoid state update after unmount
        let objectUrl: string | null = null;
        const controller = new AbortController();

        fetch(
            // `${ url_fastapi }${ filename }`,
            filename,
            {
                method: "GET",
                signal: controller.signal
            }
        )
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch image");
            console.log('get blob')
            return res.blob();
        })
        .then((blob) => {
            console.log('objectUrl')

            if (!isMounted) return;
            objectUrl = URL.createObjectURL(blob);
            setImageSrc(objectUrl);
        })
        .catch((err) => {
            if (err.name === "AbortError") {
                console.log("Fetch was aborted");
                return;
            }
            console.log("is error");
            if (isMounted) {
                setError(err instanceof Error ? err.message : String(err));
            }
        });
        // .catch((err: unknown) => {
        //     if (!isMounted) return;
        //     if (err instanceof Error) {
        //         setError(err.message);
        //     } else {
        //         setError(String(err));
        //     }
        // });

        return () => {
            console.log('unmounted')
            controller.abort(); // actually abort the fetch
            isMounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [ filename ]);

    if (error) return <div>Error: { error }</div>;
    if (!imageSrc) return <LoadingSpin />;

    return <img
        src={ imageSrc }
        alt={ filename }
        className={ classNames }
    />
};

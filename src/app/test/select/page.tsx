'use client'
import React, { ChangeEvent, useState } from "react";

function Page() {
    // Use correct types for state variables holding URLs or null
    const [ originalImage, setOriginalImage ] = useState<string | null>(null);
    const [ encryptedImageUrl, setEncryptedImageUrl ] = useState<string | null>(null);
    const [ decryptedImageUrl, setDecryptedImageUrl ] = useState<string | null>(null);

    const uploadAndEncrypt = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8000/encrypt", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            alert("Encryption failed");
            return;
        }

        // The backend now returns JSON with filename and path (not a blob)
        const data = await response.json();
        // Build URL to the encrypted image based on filename returned by backend
        const encryptedUrl = `http://localhost:8000/public/encrypted/${ data.filename }`;
        setEncryptedImageUrl(encryptedUrl);
    };

    const uploadAndDecrypt = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8000/decrypt", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            alert("Decryption failed");
            return;
        }

        // Backend returns JSON with filename and path (not a blob)
        const data = await response.json();
        const decryptedUrl = `http://localhost:8000/public/decrypted/${ data.filename }`;
        setDecryptedImageUrl(decryptedUrl);
    };

    // ChangeEvent<HTMLInputElement> is the event type for file inputs
    const handleEncryptChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setOriginalImage(URL.createObjectURL(e.target.files[0]));
            uploadAndEncrypt(e.target.files[0]);
        }
    };

    const handleDecryptChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            uploadAndDecrypt(e.target.files[0]);
        }
    };

    return (
        <div>
            <h1>Image AES Encrypt/Decrypt Demo</h1>

            <div>
                <h2>Upload image to encrypt (.jpg)</h2>
                <input
                    type="file"
                    accept="image/jpeg"
                    onChange={ handleEncryptChange }
                />
                { originalImage && (
                    <img src={ originalImage } alt="Original" style={ { maxWidth: 300 } } />
                ) }
            </div>

            <div>
                <h2>Encrypted image (.bmp)</h2>
                { encryptedImageUrl && (
                    <img src={ encryptedImageUrl } alt="Encrypted" style={ { maxWidth: 300 } } />
                ) }
            </div>

            <div>
                <h2>Upload encrypted image to decrypt (.bmp)</h2>
                <input
                    type="file"
                    accept="image/bmp"
                    onChange={ handleDecryptChange }
                />
                { decryptedImageUrl && (
                    <img src={ decryptedImageUrl } alt="Decrypted" style={ { maxWidth: 300 } } />
                ) }
            </div>
        </div>
    );
}

export default Page;

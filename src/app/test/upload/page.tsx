"use client";
import React, { useRef, useState } from "react";
import { ResponseEnc } from "@/app/api/test/upload/route";

export default function UploadForm() {
	const fileInput = useRef<HTMLInputElement>(null);
	const [ myImage, setMyImage ] = useState<ResponseEnc>()

	async function uploadFile(
		evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		evt.preventDefault();

		const formData = new FormData();
		formData.append("file", fileInput?.current?.files?.[0]!);

		const response = await fetch("/api/test/upload", {
			method: "POST",
			body: formData,
		});
		const result = await response.json();
        // console.log(result);
		const data = result.data as ResponseEnc;
		setMyImage(data)
		return data
	}

	const [ imagePreview, setImagePreview ] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const previewURL = URL.createObjectURL(file);
			setImagePreview(previewURL);
		}
	};

	return (
		<form className="flex flex-col gap-4">
			{/* eslint-disable-next-line @next/next/no-img-element */ }
			<img src={ imagePreview ?? 'https://dummyimage.com/400x300/000/ffffff.jpg' } alt="Selected file"
				 className="w-40 h-40 object-cover rounded-md border"/>

			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={ myImage
				? myImage.full_path
				: 'https://dummyimage.com/400x300/000/ffffff.jpg' }
				 alt="Selected file"
				 className="w-40 h-40 object-cover rounded-md border"/>
			<label>
				<span>Upload a file</span>
				<input type="file"
					   name="file"
					   ref={ fileInput }
					   onChange={ handleFileChange }

				/>
			</label>
			<button type="submit" onClick={ uploadFile }>
				Submit
			</button>
		</form>
	);
}
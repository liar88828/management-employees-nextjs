import React, { useRef } from "react";

export function useUploadImage(id: string = '') {
	const fileInput = useRef<HTMLInputElement>(null);

	async function uploadFile(
		evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		evt.preventDefault();

		const formData = new FormData();
		formData.append("file", fileInput?.current?.files?.[0]!);

		const response = await fetch(`/api/employee/photo/${ id }`, {
			method: "POST",
			body: formData,
		});
		const result = await response.json();
        // console.log(result);
	}

	return {
		fileInput,
		uploadFile
	}
}
'use client'
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";


export function usePrint() {
	const [ isPrinting, setIsPrinting ] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        // @ts-ignore
		contentRef,
	});
	const handlePrint = () => {
		setIsPrinting(true)
		let tempTitle = document.title;
		document.title = "Special File Name.pdf";
		// window.print()
		reactToPrintFn()
		document.title = tempTitle;
		setIsPrinting(false)
	}

	return { contentRef, handlePrint, isPrinting }
}

// export function usePrint() {
// 	const [isPrinting, setIsPrinting] = useState(false);
// 	const contentRef = useRef<HTMLDivElement>(null);
//
// 	const reactToPrintFn = useReactToPrint({
//
// 		content: () => contentRef.current,
// 		onBeforeGetContent: async () => {
// 			setIsPrinting(true);
// 			await waitForImagesToLoad(contentRef.current);
// 		},
// 		onAfterPrint: () => {
// 			setIsPrinting(false);
// 		},
// 		removeAfterPrint: true,
// 	});
//
// 	const handlePrint = () => {
// 		let tempTitle = document.title;
// 		document.title = "Special File Name.pdf";
// 		reactToPrintFn();
// 		document.title = tempTitle;
// 	};
//
// 	return { contentRef, handlePrint, isPrinting };
// }

// Fungsi untuk menunggu semua gambar dalam container selesai dimuat
// async function waitForImagesToLoad(container: HTMLElement | null): Promise<void> {
//     if (!container) return;
//
//     const images = container.querySelectorAll("imageData");
//     const promises = Array.from(images).map((img) => {
//         if (img.complete) return Promise.resolve();
//         return new Promise<void>((resolve) => {
//             img.onload = () => resolve();
//             img.onerror = () => resolve(); // Tetap resolve walaupun error agar tidak hang
//         });
//     });
//     await Promise.all(promises);
// }

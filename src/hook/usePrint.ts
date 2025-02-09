import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export function usePrint() {
	const [ isPrinting, setIsPrinting ] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		// @ts-expect-error
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
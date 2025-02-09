import { useEffect, useRef, useState } from "react"

const MAX_MOBILE_WIDTH = 600

export default function useWindowResizeThreshold(threshold: number) {
	const [ isMobileSize, setIsMobileSize ] = useState(false);
	const prevWidth = useRef(0);

	useEffect(() => {
		// Initialize state on the client
		const currWidth = window.innerWidth;
		setIsMobileSize(currWidth <= threshold);
		prevWidth.current = currWidth;

		const handleResize = () => {
			const currWidth = window.innerWidth;
			if (currWidth <= threshold && prevWidth.current > threshold) {
				setIsMobileSize(true);
			} else if (currWidth > threshold && prevWidth.current <= threshold) {
				setIsMobileSize(false);
			}
			prevWidth.current = currWidth;
		};

		window.addEventListener("resize", handleResize);
		// console.log(threshold)
		return () => window.removeEventListener("resize", handleResize);
	}, [ threshold ]);

	return isMobileSize;
}
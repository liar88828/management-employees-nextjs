import { useEffect, useState } from "react";

export const useScrollVisibility = (initialVisibility = true) => {
    const [ isVisible, setIsVisible ] = useState(initialVisibility);
    const [ lastScrollY, setLastScrollY ] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // Hide element
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true); // Show element
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ lastScrollY ]);

    return isVisible;
};

// how use
// <div
//     className={ `navbar bg-base-200/50 fixed top-0 start-0 z-20 w-full transition-transform duration-300 ${
//         showNavbar ? 'translate-y-0' : '-translate-y-full'
//     }` }
// >
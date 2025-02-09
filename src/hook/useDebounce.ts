import { useEffect, useState } from "react";

export function useDebounce<T>({ fun, value, delay = 1000 }: {
    value: T, delay?: number, fun?: () => void
}): T {
    const [ debouncedValue, setDebouncedValue ] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (fun) {
                fun()
            }
            setDebouncedValue(value)
        }, delay);

        return () => clearTimeout(handler); // Cleanup on value change or unmount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ delay, value ]);

    return debouncedValue;
}

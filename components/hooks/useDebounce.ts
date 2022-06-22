import { useEffect, useRef, useState } from "react";

const useDebounce = <T>(value: T, delay?: number)=> {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 500);

        return () => {
            clearTimeout(timeout);
        }
    }, [value, delay]);


    return {debouncedValue};
}

export default useDebounce;
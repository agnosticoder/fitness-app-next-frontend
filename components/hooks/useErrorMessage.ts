import { useEffect, useRef } from "react";
import { useErrorMessageStore } from "../store/errorMessageStore";

//Todo: Make this shit work and figure out why this rendering so many time?
//? Why this shitty hook is rendering so many times
const useErrorMessage = () => {
    const [error, setError] = useErrorMessageStore();
    const errorRef = useRef(error);

    let timeout:NodeJS.Timeout;
    
    const handleError = (error: string) => {
        setError(error);
        timeout = setTimeout(() => {
            setError('');
        }, 3000);
    };

    useEffect(() => {
        // console.log('errorRef', errorRef.current);
    }, [errorRef.current]);

    return { error, handleError };
};

export default useErrorMessage;
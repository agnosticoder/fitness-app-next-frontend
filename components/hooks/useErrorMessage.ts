import { useErrorMessageStore } from "../store/errorMessageStore";

const useErrorMessage = () => {
    const [error, setError] = useErrorMessageStore();
    
    const handleError = (error: string) => {
        setError(error);
        setTimeout(() => {
        setError('');
        }, 3000);
    };

    return { error, handleError };
};

export default useErrorMessage;
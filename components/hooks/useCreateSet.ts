import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'react-query';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

const useCreateSet = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const router = useRouter();

    interface Payload {
        exerciseId: string;
    }

    return useMutation(
        async (payload:Payload) => {
            const { data, error } = await customFetch('http://localhost:8000/set', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...payload}),
            });

            if (error) {
                console.log('useCreateSet', error);
                //* show error to user
                handleErrorMessage(error);
                return;
            }

            return data;
        },
        {
            onError: (err) => {
                //* send error to error boundary
                handleError(err);
                console.log('useCreateSet', err);
            },
            onSuccess: () => {
                router.replace(router.asPath)
            }
        }
    );
};

export default useCreateSet;
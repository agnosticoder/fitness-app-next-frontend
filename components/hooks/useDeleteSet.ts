import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

interface Payload {
    setId: string;
}

const useDeleteSet = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation(
        async (payload: Payload) => {
            const { data, error } = await customFetch('http://localhost:8000/set', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...payload }),
            });

            if (error) {
                console.log('useDeleteSet', error);
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
                console.log('useDeleteSet', err);
            },
            onSuccess: () => {
                router.replace(router.asPath);
            },
        }
    );
};

export default useDeleteSet;
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

const useCreateSet = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const router = useRouter();

    interface Payload {
        exerciseId: string;
    }

    interface Data {
        id: string;
        name: string;
        workoutId: string;
    }

    return useMutation(
        async (payload:Payload) => {
            const { data, error } = await customFetch<Data>('http://localhost:8000/set', {
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
            onSuccess: (data) => {
                if(data) {
                    queryClient.invalidateQueries(['workout', data.workoutId]);
                }
                router.replace(router.asPath)
            }
        }
    );
};

export default useCreateSet;
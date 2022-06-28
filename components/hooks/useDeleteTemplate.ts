import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

interface Payload {
    workoutId: string;
}

const useDeleteTemplate = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation(
        async (payload: Payload) => {
            const { data, error } = await customFetch('http://localhost:8000/workout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...payload }),
            });

            if (error) {
                console.log('useDeleteTemplate', error);
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
                console.error('useDeleteTemplate', err);
            },
            onSuccess: () => {
                queryClient.invalidateQueries('workouts');
            },
        }
    );
};

export default useDeleteTemplate;
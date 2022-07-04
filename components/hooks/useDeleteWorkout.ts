import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

interface Payload {
    workoutId: string;
}

const useDeleteWorkout = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation(
        async (payload: Payload) => {
            const { data, error } = await customFetch(`${config.apiUrl}/workout`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...payload }),
            });

            if (error) {
                console.log('useCreateWorkout', error);
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
                console.error('useCreateWorkout', err);
            },
            onSuccess: () => {
                queryClient.invalidateQueries('workouts');
            },
        }
    );
};

export default useDeleteWorkout;
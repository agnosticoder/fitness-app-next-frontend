import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import { setNotificationAtom } from '../store/atoms';
import { customFetch } from './useFetch';
import { Exercise } from './useGetWorkout';

interface Payload {
    exerciseId: string;
}

const useDeleteExercise = () => {
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const router = useRouter();
    const setNotification = useSetAtom(setNotificationAtom);

    return useMutation(
        async (payload: Payload) => {
            const { data, error } = await customFetch<Exercise>(`${config.apiUrl}/exercise`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...payload }),
            });

            if (error) {
                console.log('useDeleteExercise error', error);
                //* show error to user
                setNotification({ message: error, mode: 'error' });
                return;
            }

            return data;
        },
        {
            onError: (err) => {
                //* send error to error boundary
                handleError(err);
                console.log('useDeleteExercise error', err);
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(['workout', data?.workoutId]);
            },
        }
    );
};

export default useDeleteExercise;
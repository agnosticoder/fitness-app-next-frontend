import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import { setNotificationAtom } from '../store/atoms';
import { customFetch } from './useFetch';
import type { DeleteWorkoutPayload } from '../../../back_end/src/controllers/workouts';


const useDeleteWorkout = () => {
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const router = useRouter();
    const setNotification = useSetAtom(setNotificationAtom);

    return useMutation(
        async (payload: DeleteWorkoutPayload) => {
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
                setNotification({ message: error, mode: 'error' });
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
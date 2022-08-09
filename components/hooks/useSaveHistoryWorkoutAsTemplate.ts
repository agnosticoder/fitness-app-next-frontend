import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import { setNotificationAtom } from '../store/atoms';
import { customFetch } from './useFetch';
import { Workout } from './useGetWorkout';
import type { CopyWorkoutPayload } from '../../../back_end/src/controllers/workouts';


const useSaveHistoryWorkoutAsTemplate = () => {
    const handleError = useErrorHandler();
    const router = useRouter();
    const queryClient = useQueryClient();
    const setNotification = useSetAtom(setNotificationAtom);

    return useMutation(
        async (workout: CopyWorkoutPayload) => {
            const { data, error } = await customFetch(`${config.apiUrl}/workout/copytotemplate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workout),
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
            onSuccess: (data) => {
                router.push('/');
                queryClient.invalidateQueries('workouts');
            },
        }
    );
};

export default useSaveHistoryWorkoutAsTemplate;

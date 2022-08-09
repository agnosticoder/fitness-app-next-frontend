import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import { customFetch } from './useFetch';
import { config } from '../../config/config';
import { useSetAtom } from 'jotai';
import { setNotificationAtom } from '../store/atoms';
import type { CreateExercisesPayload } from '../../../back_end/src/controllers/exercises';

const useCreateExercises = () => {
    const handleError = useErrorHandler();
    const router = useRouter();
    const { id: workoutId } = router.query as { id: string };
    const queryClient = useQueryClient();
    const setNotification = useSetAtom(setNotificationAtom);

    return useMutation(
        async (payload: CreateExercisesPayload) => {
            const { data, error } = await customFetch(`${config.apiUrl}/exercises`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...payload }),
            });

            if (error) {
                console.log('useCreateExercises', error);
                //* show error to user
                setNotification({message: error, mode: 'error'});
                return;
            }

            return data;
        },
        {
            onError: (err) => {
                //* send error to error boundary
                handleError(err);
                console.log('useCreateExercises', err);
            },
            onSuccess: () => {
                // router.replace(router.asPath);
                queryClient.invalidateQueries(['workout', workoutId]);
            },
        }
    );
};

export default useCreateExercises;

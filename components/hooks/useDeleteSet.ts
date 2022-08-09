import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import { setNotificationAtom } from '../store/atoms';
import { customFetch } from './useFetch';
import type { DeleteSetPayload } from '../../../back_end/src/controllers/sets';


const useDeleteSet = (workoutId: string) => {
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const router = useRouter();
    const setNotification = useSetAtom(setNotificationAtom);

    return useMutation(
        async (payload: DeleteSetPayload) => {
            const { data, error } = await customFetch(`${config.apiUrl}/set`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...payload }),
            });

            if (error) {
                console.log('useDeleteSet', error);
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
                console.log('useDeleteSet', err);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['workout', workoutId]);
                // router.replace(router.asPath);
            },
        }
    );
};

export default useDeleteSet;
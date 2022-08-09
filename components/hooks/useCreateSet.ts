import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import { setNotificationAtom } from '../store/atoms';
import { customFetch } from './useFetch';
import type { CreateSetPayload } from '../../../back_end/src/controllers/sets';

interface Data {
    id: string;
    name: string;
    workoutId: string;
}

const useCreateSet = () => {
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const router = useRouter();
    const setNotification = useSetAtom(setNotificationAtom);



    return useMutation(
        async (payload:CreateSetPayload) => {
            const { data, error } = await customFetch<Data>(`${config.apiUrl}/set`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...payload}),
            });

            if (error) {
                console.log('useCreateSet', error);
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
                console.log('useCreateSet', err);
            },
            onSuccess: (data) => {
                if(data) {
                    queryClient.invalidateQueries(['workout', data.workoutId]);
                }
                // router.replace(router.asPath)
            }
        }
    );
};

export default useCreateSet;
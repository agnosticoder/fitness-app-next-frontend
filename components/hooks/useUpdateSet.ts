import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import { setNotificationAtom } from '../store/atoms';
import { customFetch } from './useFetch';

interface PayloadWithWeight{
    setId: string;
    weight?: string;
    reps?: never;
    isDone?: never;
}

interface PayloadWithReps {
    setId: string;
    reps?: string;
    weight?: never;
    isDone?: never;
}

interface PayloadWithIsDone {
    setId: string;
    isDone: boolean;
    weight?: never;
    reps?: never;
}

type Payload = PayloadWithWeight | PayloadWithReps | PayloadWithIsDone;

const useUpdateSet = () => {
    const handleError = useErrorHandler();
    const router = useRouter();
    const { id: workoutId } = router.query as { id: string };
    const queryClient = useQueryClient();
    const setNotification = useSetAtom(setNotificationAtom);

    return useMutation(
        async (payload:Payload) => {
            const { data, error } = await customFetch(`${config.apiUrl}/set`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...payload}),
            });

            if (error) {
                console.log('useUpdateSet', error);
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
                console.log('useUpdateSet', err);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['workout', workoutId]);
                // router.replace(router.asPath)
            }
        }
    );
}

export default useUpdateSet;
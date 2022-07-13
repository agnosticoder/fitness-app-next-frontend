import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { config } from '../../config/config';
import { setNotificationAtom } from '../store/atoms';
import { customFetch } from './useFetch';

type Payload = any;

const useFinishWorkout = (path: string) => {
    const handleError = useErrorHandler();
    const router = useRouter();
    const setNotification = useSetAtom(setNotificationAtom);

    return useMutation(
        async (payload:Payload) => {
            const { data, error } = await customFetch(`${config.apiUrl}/finishworkout`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...payload}),
            });

            if (error) {
                console.log('useFinishWorkout', error);
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
                console.log('useFinishWorkout', err);
            },
            onSuccess: () => {
                router.push(path);
            }
        }
    );
}

export default useFinishWorkout;
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'react-query';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

type Payload = any;

const useFinishWorkout = (path: string) => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const router = useRouter();

    return useMutation(
        async (payload:Payload) => {
            const { data, error } = await customFetch('http://localhost:8000/finishworkout', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...payload}),
            });

            if (error) {
                console.log('useFinishWorkout', error);
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
                console.log('useFinishWorkout', err);
            },
            onSuccess: () => {
                router.push(path);
            }
        }
    );
}

export default useFinishWorkout;
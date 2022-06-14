import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'react-query';
import useErrorMessage from './useErrorMessage';
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
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const router = useRouter();

    return useMutation(
        async (payload:Payload) => {
            const { data, error } = await customFetch('http://localhost:8000/set', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...payload}),
            });

            if (error) {
                console.log('useUpdateSet', error);
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
                console.log('useUpdateSet', err);
            },
            onSuccess: () => {
                router.replace(router.asPath)
            }
        }
    );
}

export default useUpdateSet;
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'react-query';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

type Payload = any;

const useSaveTemplate = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const router = useRouter();

    return useMutation(
        async (payload:Payload) => {
            const { data, error } = await customFetch('http://satinder.local:8000/savetemplate', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...payload}),
            });

            if (error) {
                console.log('useSaveTemplate', error);
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
                console.log('useSaveTemplate', err);
            },
            onSuccess: () => {
                router.push('/');
            }
        }
    );
}

export default useSaveTemplate;
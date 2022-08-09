import { useMutation } from 'react-query';
import { config } from '../../config/config';
import { customFetch } from './useFetch';
import type { LoginPayload } from '../../../back_end/src/controllers/user';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';

const useLogin = () => {
    const handleError = useErrorHandler();
    const router = useRouter();

    return useMutation(async (payload: LoginPayload) => {
        const {data, error} = await customFetch(`${config.apiUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        return {data, error};
    },
        {
            onError: (err) => {
                //* send error to error boundary
                handleError(err);
                console.log('useSaveTemplate', err);
            },
            onSuccess: () => {
                // router.push('/');
            }
        }
    );
};

export default useLogin;

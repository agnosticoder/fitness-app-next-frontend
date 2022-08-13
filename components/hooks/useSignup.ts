import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import { customFetch } from './useFetch';
// import type { SignupPayload } from '../../../back_end/src/controllers/user';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';

type Payload = {
    name: string;
    email: string;
    password: string;
}

const useSignup = () => {
    const handleError = useErrorHandler();
    const router = useRouter();
    const queryCleint = useQueryClient();

    return useMutation(
        async (payload: Payload) => {
            const { data, error } = await customFetch(`${config.apiUrl}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            return { data, error };
        },
        {
            onError: (err) => {
                //* send error to error boundary
                handleError(err);
                console.log('useSaveTemplate', err);
            },
            onSuccess: (data) => {
                if (data.data) {
                    queryCleint.invalidateQueries(['getUser']);
                    router.push('/');
                }
            },
        }
    );
};

export default useSignup;

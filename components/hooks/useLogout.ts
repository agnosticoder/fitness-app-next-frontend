import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import { customFetch } from './useFetch';
import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';

const useLogout = () => {
    const handleError = useErrorHandler();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation(async () => {
        const {data, error} = await customFetch(`${config.apiUrl}/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return {data, error};
    },
        {
            onError: (err) => {
                //* send error to error boundary
                handleError(err);
                console.log('useLogout', err);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['getUser']);
                router.push('/login');
            }
        }
    );
};

export default useLogout;

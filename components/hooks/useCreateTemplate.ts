import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import { config } from '../../config/config';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

interface Set{
    reps?: string;
    weight?: string;
}
interface Exercise {
    name: string;
    sets?: Set[];
}

interface Workout {
    name: string;
    exercises: Exercise[];
}

interface Data{
    id: string;
    name: string;
}

const useCreateTemplate = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation(
        async (workout: Workout) => {
            const { data, error } = await customFetch<Data>(`${config.apiUrl}/workout/template`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workout),
            });

            if (error) {
                console.log('useCreateTemplate error', error);
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
                console.error('useCreateTemplate', err);
            },
            onSuccess: (data) => {
                if (data) {
                    console.log('success', data);
                    queryClient.invalidateQueries('workouts');
                    router.replace(`/`);
                }
            },
        }
    );
};

export default useCreateTemplate;

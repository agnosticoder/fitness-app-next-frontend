import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { config } from '../../config/config';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

interface Set{
    reps?: string;
    weight?: string;
}

interface Exercise {
    name: string;
    
}

interface Workout {
    name: string;
    exercises?: Exercise[];
}

interface Data{
    id: string;
    name: string;
}

const useCreateWorkout = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const router = useRouter();

    return useMutation(
        async (workout: Workout) => {
            console.log('workout', workout);
            const { data, error } = await customFetch<Data>(`${config.apiUrl}/workout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workout),
            });

            if (error) {
                console.log('useCreateWorkout', error);
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
                console.error('useCreateWorkout', err);
            },
            onSuccess: (data) => {
                if (data) {
                    router.push(`/workout/${data.id}`);
                }
            },
        }
    );
};

export default useCreateWorkout;

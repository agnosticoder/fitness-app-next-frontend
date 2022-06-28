import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation, useQueryClient } from 'react-query';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';
import { Workout } from './useGetWorkout';

type Payload = Workout;


const useSaveHistoryWorkoutAsTemplate = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation(
        async (workout: Payload) => {
            const { data, error } = await customFetch('http://localhost:8000/workout/copytotemplate', {
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
                router.push('/');
                queryClient.invalidateQueries('workouts');
            },
        }
    );
};

export default useSaveHistoryWorkoutAsTemplate;

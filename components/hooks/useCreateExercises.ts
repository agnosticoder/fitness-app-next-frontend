import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'react-query';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

interface Exercise {
    name: string;
}

interface Payload {
    workoutId: string;
    exercises: Exercise[];
}

const useCreateExercises = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const router = useRouter();

    return useMutation(
        async (payload:Payload) => {
            const { data, error } = await customFetch('http://localhost:8000/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...payload}),
            });

            if (error) {
                console.log('useCreateExercises', error);
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
                console.log('useCreateExercises', err);
            },
            onSuccess: () => {
                router.replace(router.asPath)
            }
        }
    );
};

export default useCreateExercises;
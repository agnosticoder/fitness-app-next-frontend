import { useRouter } from 'next/router';
import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'react-query';
import useErrorMessage from './useErrorMessage';
import { customFetch } from './useFetch';

interface Exercise {
    name: string;
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

    return useMutation(
        async (workout: Workout) => {
            const { data, error } = await customFetch<Data>('http://localhost:8000/workout/template', {
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
                    router.push(`/template/${data.id}`);
                }
            },
        }
    );
};

export default useCreateTemplate;

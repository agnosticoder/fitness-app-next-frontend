import { useQuery } from 'react-query';
import { customFetch } from './useFetch';
import { useErrorHandler } from 'react-error-boundary';
import useErrorMessage from './useErrorMessage';

export interface OnlyWorkout {
    id: string;
    name: string;
    isDone: boolean;
}

const useGetWorkouts = () => {
    const handleError = useErrorHandler();
    const {handleError: handleErrorMessage} = useErrorMessage();
    return useQuery('workouts', async () => {
        const {data, error} = await customFetch<OnlyWorkout[]>('http://localhost:8000/workouts');
        if(error) {
            handleErrorMessage(error);
            return;
        }
        return data;
    },
        {
            //Todo: add error handler
            onError: (err) => console.error(err),
        }
    );
};

export default useGetWorkouts;
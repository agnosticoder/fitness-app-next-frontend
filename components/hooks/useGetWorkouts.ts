import { useQuery } from 'react-query';
import { customFetch } from './useFetch';
import { useErrorHandler } from 'react-error-boundary';
import useErrorMessage from './useErrorMessage';

export interface Set {
    id: string;
    reps: string;
    weight: string;
    setOrder: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
    exerciseId: string;
}

interface Exercise {
    id: string;
    name: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
    workoutId: string;
    sets: Set[];
}

export interface Workout {
    id: string;
    name: string;
    isDone: boolean;
    isTemplate: boolean;
    createdAt: string;
    updatedAt: string;
    exercises: Exercise[];
}

const useGetWorkouts = () => {
    const handleError = useErrorHandler();
    const {handleError: handleErrorMessage} = useErrorMessage();
    return useQuery('workouts', async () => {
        const {data, error} = await customFetch<Workout[]>('http://satinder.local:8000/workouts');
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
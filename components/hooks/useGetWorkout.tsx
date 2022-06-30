import { useQuery } from 'react-query';
import { customFetch } from './useFetch';
import { useErrorHandler } from 'react-error-boundary';
import useErrorMessage from './useErrorMessage';

export interface Set {
    id: string;
    weight: string;
    reps: string;
    setOrder: string | null;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
    exerciseId: string;
}

export interface Exercise {
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

const useGetWorkout = ({ id }: { id: string }) => {
    const handleError = useErrorHandler();
    //Todo: Fix the following shit, try to make this with jotai
    const {handleError: handleErrorMessage} = useErrorMessage();
    return useQuery(['workout', id], async () => {
        const {data, error} = await customFetch<Workout>(`http://satinder.local:8000/workout/${id}`);
        if(error) {
            handleErrorMessage(error);
            return;
        }
        return data;
    },
        {
            //Todo: add error handler
            onError: (err) => console.error(err),
            enabled: !!id,
        }
    );
};

export default useGetWorkout;
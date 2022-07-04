import { useRouter } from "next/router";
import { useErrorHandler } from "react-error-boundary";
import { useMutation, useQueryClient } from "react-query";
import { config } from "../../config/config";
import useErrorMessage from "./useErrorMessage";
import { customFetch } from "./useFetch";
import { Workout } from "./useGetWorkout";

type Payload = {
    id: string;
    name?: string;
    isTemplate?: boolean;
    isDone?: boolean;
}

const useUpdateWorkout = () => {
    const { handleError: handleErrorMessage } = useErrorMessage();
    const handleError = useErrorHandler();
    const router = useRouter();
    const { id: workoutId } = router.query as { id: string };
    const queryClient = useQueryClient();

    return useMutation(
        async (payload: Payload) => {
            const { data, error } = await customFetch<Workout>(`${config.apiUrl}/workout/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (error) {
                console.log('useUpdateWorkout', error);
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
                console.log('useUpdateWorkout', err);
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(['workouts']);
                if (data) {
                    queryClient.invalidateQueries(['workout', data.id]);
                }
            },
        }
    );
};

export default useUpdateWorkout;
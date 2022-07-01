import produce from "immer";
import Button from "./Button";
import useErrorMessage from "./hooks/useErrorMessage";
import useFinishWorkout from "./hooks/useFinishWorkout";
import { Exercise, Workout } from "./hooks/useGetWorkout";

const FinishWorkoutButton = ({ id, name, exercises, identifier }: Workout & { identifier: 'history' | 'workout' }) => {
    const path = identifier === 'history' ? '/history' : '/';
    const { mutate, data } = useFinishWorkout(path);
    const { handleError } = useErrorMessage();

    const onFinishWorkout = () => {
        if (exercises?.length === 0) {
            handleError('Please add at least one exercise');
            return;
        }

        // if any exercise has no weight or reps, send message saying reps and weight are required
        const isDone = exercises.every((exercise: any) => {
            if (exercise.sets?.length === 0) {
                handleError(`Please add at least one set to ${exercise.name}`);
                return false;
            }

            return exercise.sets.every((set: any) => {
                if (set.isDone === false) {
                    handleError(`Please mark set ${set.id} as done`);
                    return false;
                }

                return set.isDone;
            });
        });

        if (isDone) {
            const exercisesWithSets = produce(exercises, (draft: Exercise[]) => {
                draft.forEach((exercise) => {
                    exercise.sets = exercise.sets.map((set, index) => {
                        return {
                            ...set,
                            setOrder: String(index + 1),
                        };
                    });
                });
            });

            mutate({ id, name, exercises: exercisesWithSets });
        }
    };
    return (
            <button className="bg-green-500 text-zinc-100 font-bold py-1 px-2 rounded-md" onClick={onFinishWorkout}>{identifier === 'history' ? 'Save' : 'Finish Workout'}</button>
    );
};

export default FinishWorkoutButton;

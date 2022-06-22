import produce from "immer";
import { Exercise, Workout } from "../pages/workout/[id]";
import Button from "./Button";
import useErrorMessage from "./hooks/useErrorMessage";
import useFinishWorkout from "./hooks/useFinishWorkout";

const FinishWorkoutButton = ({id, name, exercises}: Workout) => {
    const {mutate, data} = useFinishWorkout();
    const {handleError} = useErrorMessage();

    const onFinishWorkout = () => {
        if(exercises?.length === 0) {
            handleError('Please add at least one exercise');
            return;
        }

        const isDone = exercises.every((exercise: any) => {
            if (exercise.sets?.length === 0) {
                handleError(`Please add at least one set to ${exercise.name}`);
                return false;
            }

            return exercise.sets.every((set: any) => {
                if(set.isDone === false){
                    handleError(`Please mark set ${set.id} as done`);
                    return false;
                }

                return set.isDone;
            });
        });

        if(isDone) {
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

            mutate({id, name, exercises: exercisesWithSets});
        }
    }
    return <Button onClick={onFinishWorkout}>Finish Workout</Button>;
};

export default FinishWorkoutButton;

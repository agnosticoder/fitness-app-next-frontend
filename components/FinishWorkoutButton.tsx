import produce from "immer";
import { useSetAtom } from 'jotai';
import Button from "./Button";
import useErrorMessage from "./hooks/useErrorMessage";
import useFinishWorkout from "./hooks/useFinishWorkout";
import { Workout } from './hooks/useGetWorkout';
import { setNotificatonAtom, WorkoutLocal } from './store/atoms';

//Todo: Findout why WorkoutLocal is accepted my workout/id page but Workout from useGetWorkout is not by history/edit/[id] page
const FinishWorkoutButton = ({ id, name, exercises, identifier }: WorkoutLocal & { identifier: 'history' | 'workout' }) => {
    const path = identifier === 'history' ? '/history' : '/';
    const { mutate, data } = useFinishWorkout(path);
    const { handleError } = useErrorMessage();
    const setNotification = useSetAtom(setNotificatonAtom);

    const onFinishWorkout = () => {
        console.log('onFinishWorkout');
        if (exercises?.length === 0) {
            // handleError('Please add at least one exercise');
            setNotification({message: 'Please add at least one exercise', mode: 'info'});
            return;
        }

        // if any exercise has no weight or reps, send message saying reps and weight are required
        const isDone = exercises.every((exercise: any) => {
            console.log('exercise', exercise);
            if(!exercise.sets) {
                return setNotification({message: 'Please add at least one set', mode: 'info'});
            }
            if (exercise.sets?.length === 0) {
                // handleError(`Please add at least one set to ${exercise.name}`);
                setNotification({message: `Please add at least one set to ${exercise.name}`, mode: 'info'});
                return false;
            }

            return exercise.sets?.every((set: any) => {
                if (set.isDone === false) {
                    // handleError(`Please mark set ${set.id} as done`);
                    setNotification({message: `Please mark set ${set.id} as done`, mode: 'info'});
                    return false;
                }

                return set.isDone;
            });
        });

        if (isDone) {
            const exercisesWithSets = produce(exercises, (draft) => {
                draft.forEach((exercise) => {
                    exercise.sets = exercise.sets?.map((set, index) => {
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

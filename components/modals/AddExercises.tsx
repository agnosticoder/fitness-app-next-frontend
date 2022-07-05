import NiceModal, {useModal} from '@ebay/nice-modal-react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { AiFillCloseCircle } from 'react-icons/ai';
import ChooseExercisesBrowser from '../ChooseExercisesBrowser';
import GenricDialog from '../GenricDialog';
import useCreateExercises from '../hooks/useCreateExercises';
import { confirmDialogAtom, getWorkoutAtom, selectedExercisesAtom, setWorkoutAtom } from '../store/atoms';
import {BrowserView, MobileView} from 'react-device-detect';
import ChooseExercisesMobile from '../ChooseExercisesMobile';
import {z} from 'zod';
import produce from 'immer';
import { v4 as uuid } from 'uuid';

const AddExercises = NiceModal.create(({ workoutId, isTemplate }: { workoutId: string, isTemplate: boolean }) => {
    const { visible, hide } = useModal();
    const [selectedExercises] = useAtom(selectedExercisesAtom);
    const { mutate, data } = useCreateExercises();
    const workout = useAtomValue(getWorkoutAtom);
    const setWorkout = useSetAtom(setWorkoutAtom);

    const onAddExercises = () => {
        const exercises = z.array(z.object({ name: z.string() })).parse(selectedExercises);
        const exercisesWithUuid = exercises.map((exercise) => ({ ...exercise, id: uuid() }));
        if (isTemplate) {
            const newWorkout = produce(workout, (draft) => {
                draft.exercises = [...draft.exercises, ...exercisesWithUuid];
            });
            setWorkout({ workout: newWorkout });
            hide();
            return;
        }
        mutate({ workoutId, exercises });
        hide();
    };

    return (
        <div>
            <GenricDialog isOpen={visible}>
                <div className="w-full">
                    <div className="relative bg-zinc-800 text-zinc-200 rounded-md p-2 max-w-sm m-auto drop-shadow-2xl">
                        <h1 className="text-2xl font-bold my-4 text-center">Add Exercises</h1>
                        <button className="absolute top-0 left-0" onClick={hide} type="button">
                            <AiFillCloseCircle size={40} className="p-2 text-red-500" />
                        </button>
                        <BrowserView>
                            <ChooseExercisesBrowser />
                        </BrowserView>
                        <MobileView>
                            <ChooseExercisesMobile />
                        </MobileView>
                        <button
                            disabled={!selectedExercises.length}
                            className="font-bold text-lg absolute top-0 right-0 p-2 text-rose-600 disabled:text-rose-600/40"
                            onClick={onAddExercises}
                            type="button"
                        >
                            Add {!!selectedExercises.length && '(' + selectedExercises.length + ')'}
                        </button>
                    </div>
                </div>
            </GenricDialog>
        </div>
    );
});

export default AddExercises;
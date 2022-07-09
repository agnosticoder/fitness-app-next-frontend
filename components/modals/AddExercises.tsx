import NiceModal, {useModal} from '@ebay/nice-modal-react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { AiFillCloseCircle } from 'react-icons/ai';
import ChooseExercisesBrowser from '../ChooseExercisesBrowser';
import GenricDialog from '../GenricDialog';
import useCreateExercises from '../hooks/useCreateExercises';
import { dispatchWorkoutAtom, selectedExercisesAtom} from '../store/atoms';
import {BrowserView, MobileView} from 'react-device-detect';
import ChooseExercisesMobile from '../ChooseExercisesMobile';
import {z} from 'zod';
import useGetLatestExercises from '../hooks/useGetLatestExercises';

const ExerciseSchema = z.array(
    z.object({
        name: z.string(),
        sets: z
            .array(
                z.object({
                    reps: z.string().optional(),
                    weight: z.string().optional(),
                })
            )
            .optional(),
    })
);

const AddExercises = NiceModal.create(({ workoutId, isTemplate }: { workoutId: string, isTemplate: boolean }) => {
    const { visible, hide } = useModal();
    const selectedExercises = useAtomValue(selectedExercisesAtom);
    const { data: latestExercises} = useGetLatestExercises({names: selectedExercises.map((exercise) => exercise?.name)});
    console.log('latestExercises', latestExercises);
    const { mutate } = useCreateExercises();
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    const onAddExercises = () => {
        const exercises = ExerciseSchema.parse(latestExercises);
        if (isTemplate) {
            dispatchWorkout({type: 'ADD_EXERCISE'});
            hide();
            return;
        }

        console.log('exercises', exercises);
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
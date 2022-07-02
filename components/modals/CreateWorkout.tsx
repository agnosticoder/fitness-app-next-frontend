import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import ChooseExercises from '../ChooseExercisesBrowser';
import GenricDialog from '../GenricDialog';
import useCreateWorkout from '../hooks/useCreateWorkout';
import useGetLatestExercises from '../hooks/useGetLatestExercises';
import { z } from 'zod';
import Confrim from './Confirm';
import { confirmDialogAtom, selectedExercisesAtom } from '../store/atoms';
import { useAtom } from 'jotai';

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
).optional();

interface Inputs {
    workoutName: string;
}

const CreatWorkout = NiceModal.create(() => {
    const { visible, hide } = useModal();
    const { mutate } = useCreateWorkout();
    const [selectedExercises] = useAtom(selectedExercisesAtom)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();
    const exercisesWithNames = selectedExercises.map((exercise) => exercise.name);
    const { data: latestExercises } = useGetLatestExercises({ names: exercisesWithNames });
    const [, setConfirmDialog] = useAtom(confirmDialogAtom);

    const onSubmit = ({ workoutName }: Inputs) => {
        const exercises = ExerciseSchema.parse(latestExercises);
        mutate({ name: workoutName, exercises: exercises });
        hide();
    };

    return (
        <>
            <GenricDialog isOpen={visible}>
                <Dialog.Title>Create Workout</Dialog.Title>
                <Dialog.Description>Please start adding exercises and more</Dialog.Description>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="p-2 w-full rounded"
                        type="text"
                        placeholder="Workout Name"
                        {...register('workoutName', { required: 'required' })}
                    />
                    {errors.workoutName && <span className="text-red-500">{errors.workoutName.message}</span>}
                    <ChooseExercises />
                    <div>
                        <Button type="submit">Create Workout</Button>
                    </div>
                    <div>
                        <Button type="button" onClick={() => {
                            setConfirmDialog(true);
                        }}>
                            Close
                        </Button>
                    </div>
                </form>
                <Confrim hide={() => hide()} reset={() => reset()}/>
            </GenricDialog>
        </>
    );
});

export default CreatWorkout;

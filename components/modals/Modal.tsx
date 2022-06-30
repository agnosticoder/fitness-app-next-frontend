import NiceModal, {useModal} from '@ebay/nice-modal-react';
import { useRouter } from 'next/router';
import GenricDialog from '../GenricDialog';
import useCreateWorkout from '../hooks/useCreateWorkout';
import useGetWorkout from '../hooks/useGetWorkout';
import {z} from 'zod';
import ExercisesOverview from '../ExerciesesOverview';

const Set = z.object({
    reps: z.string().optional(),
    weight: z.string().optional(),
});

const Exercise = z.object({
    name: z.string(),
    sets: z.array(Set),
});

const Workout = z.object({
    name: z.string(),
    exercises: z.array(Exercise),
});

const Modal = NiceModal.create(() => {
    const workoutId = 'f8a13a9e-1876-4b75-98c2-aa2e859a0d48';
    const { visible, hide } = useModal();
    const { data: workout } = useGetWorkout({ id: workoutId });
    const { mutate } = useCreateWorkout();
    const router = useRouter();

    const onStartWorkout = () => {
        const newWorkout = Workout.parse(workout);
        mutate({ ...newWorkout });

        hide();
    };

    const onEdit = () => {
        router.push(`/template/${workoutId}/`);
        hide();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="text-center">
                {workout && <ExercisesOverview workout={workout} />}
                <button
                    onClick={onStartWorkout}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Start Workout
                </button>
                <button
                    onClick={onEdit}
                    className="bg-gray-200 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-4"
                >
                    Edit
                </button>
                <button
                    onClick={hide}
                    className="bg-gray-200 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-4"
                >
                    Cancel
                </button>
            </div>
        </GenricDialog>
    );
});

export default Modal;
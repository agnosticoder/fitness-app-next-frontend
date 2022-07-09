import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useRouter } from 'next/router';
import ExercisesOverview from '../ExerciesesOverview';
import GenricDialog from '../GenricDialog';
import useCreateWorkout from '../hooks/useCreateWorkout';
import useGetWorkout from '../hooks/useGetWorkout';
import { z } from 'zod';

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

const StartTemplateWorkout = NiceModal.create(({ workoutId }: { workoutId: string }) => {
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
            <div className="text-center w-80 bg-zinc-800 text-zinc-200 p-4 rounded-md drop-shadow-2xl">
                {workout && <ExercisesOverview workout={workout} />}
                <div className='mx-6'>
                    <button
                        onClick={onStartWorkout}
                        className="block w-full mb-2 bg-green-500 px-3 py-1 rounded drop-shadow-md"
                    >
                        Start Workout
                    </button>
                    <button onClick={onEdit} className="block w-full mb-2 bg-zinc-500 px-3 py-1 rounded drop-shadow-md">
                        Edit
                    </button>
                    <button onClick={hide} className="block w-full mb-2 bg-zinc-500 px-3 py-1 rounded drop-shadow-md">
                        Cancel
                    </button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default StartTemplateWorkout;
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import { useRouter } from 'next/router';
import invariant from 'tiny-invariant';
import Button from '../Button';
import GenricDialog from '../GenricDialog';
import useDeleteTemplate from '../hooks/useDeleteTemplate';
import useGetWorkouts from '../hooks/useGetWorkouts';
import {z} from 'zod';
import useGetWorkout from '../hooks/useGetWorkout';
import useCreateWorkout from '../hooks/useCreateWorkout';

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

const ConfirmStartNewTemplateWorkout = NiceModal.create(({workoutId}: {workoutId: string}) => {
    const { visible, hide } = useModal();
    const { data: workouts } = useGetWorkouts();
    const { data: workout } = useGetWorkout({ id: workoutId });
    const { mutate: deleteTemplate } = useDeleteTemplate();
    const { mutate: createWorkout } = useCreateWorkout();
    const router = useRouter();

    const inProcessWorkouts = workouts?.filter((workout) => !workout.isDone && !workout.isTemplate);

    const onResumeTemplate = () => {
        invariant(inProcessWorkouts, 'inProcessTemplates is undefined');
        router.push(`/workout/${inProcessWorkouts[0].id}`);
        hide();
    };

    const onStartNewTemplate = () => {
        invariant(inProcessWorkouts, 'inProcessTemplates is undefined');
        deleteTemplate({ workoutId: inProcessWorkouts[0].id });
        const newWorkout = Workout.parse(workout);
        createWorkout({ ...newWorkout });

        hide();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            {/* <div className="flex justify-center items-center flex-col bg-slate-300 p-4 rounded-md">
                <h1>You have workout still in progress. Starting new workout will delete the workout in progress</h1>

                <div className="flex justify-center items-center">
                    <Button onClick={onResumeTemplate}>Resume workout</Button>
                    <Button className="bg-red-500" onClick={onStartNewTemplate}>
                        Start workout from template
                    </Button>
                    <Button onClick={hide}>Cancel</Button>
                </div>
            </div> */}
            <div className="text-center max-w-xs bg-zinc-800 text-zinc-200 p-4 rounded-md drop-shadow-2xl">
                <h1 className='font-semibold mb-4'>
                You have workout still in progress. Starting new workout will delete the workout in progress!
                </h1>

                <div className="mx-6">
                    <button className='block w-full mb-2 bg-zinc-500 px-3 py-1 rounded drop-shadow-md' onClick={onResumeTemplate}>Resume</button>
                    <button className="block w-full mb-2 bg-red-500 px-3 py-1 rounded drop-shadow-md" onClick={onStartNewTemplate}>
                        Start New Workout
                    </button>
                    <button className='block w-full mb-2 bg-zinc-500 px-3 py-1 rounded drop-shadow-md' onClick={hide}>Cancel</button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default ConfirmStartNewTemplateWorkout;
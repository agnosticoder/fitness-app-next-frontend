import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useRouter } from 'next/router';
import invariant from 'tiny-invariant';
import { getWorkoutName } from '../../lib/getWorkoutName';
import Button from '../Button';
import GenricDialog from '../GenricDialog';
import useCreateWorkout from '../hooks/useCreateWorkout';
import useDeleteTemplate from '../hooks/useDeleteTemplate';
import useGetWorkouts from '../hooks/useGetWorkouts';

const ConfirmStartNewWorkout = NiceModal.create(() => {
    const { visible, hide } = useModal();
    const { data: workouts } = useGetWorkouts();
    const { mutate:deleteWorkout } = useDeleteTemplate();
    const {mutate: createWorkout} = useCreateWorkout();
    const router = useRouter();

    const inProcessWorkouts = workouts?.filter((workout) => !workout.isDone && !workout.isTemplate);

    const onResumeTemplate = () => {
        invariant(inProcessWorkouts, 'inProcessWorkouts is undefined');
        router.push(`/workout/${inProcessWorkouts[0].id}`);
        hide();
    };

    const onStartNewWorkout = () => {
        invariant(inProcessWorkouts, 'inProcessWorkouts is undefined');
        deleteWorkout({ workoutId: inProcessWorkouts[0].id });
        createWorkout({name: getWorkoutName()});
        hide();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="text-center max-w-xs bg-zinc-800 text-zinc-200 p-4 rounded-md drop-shadow-2xl">
                <h1 className='font-semibold mb-4'>
                You have workout still in progress. Starting new workout will delete the workout in progress!
                </h1>

                <div className="mx-6">
                    <button className='block w-full mb-2 bg-zinc-500 px-3 py-1 rounded drop-shadow-md' onClick={onResumeTemplate}>Resume</button>
                    <button className="block w-full mb-2 bg-red-500 px-3 py-1 rounded drop-shadow-md" onClick={onStartNewWorkout}>
                        Start New Workout
                    </button>
                    <button className='block w-full mb-2 bg-zinc-500 px-3 py-1 rounded drop-shadow-md' onClick={hide}>Cancel</button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default ConfirmStartNewWorkout;
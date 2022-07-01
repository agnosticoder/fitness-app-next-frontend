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
            <div className="flex justify-center items-center flex-col bg-slate-300 p-4 rounded-md">
                <h1>You have workout still in progress. Starting new workout will delete the workout in progress</h1>

                <div className="flex justify-center items-center">
                    <Button onClick={onResumeTemplate}>Resume Workout</Button>
                    <Button className="bg-red-500" onClick={onStartNewWorkout}>
                        Start New Workout
                    </Button>
                    <Button onClick={hide}>Cancel</Button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default ConfirmStartNewWorkout;
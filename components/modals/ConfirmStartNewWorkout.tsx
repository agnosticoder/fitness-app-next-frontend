import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useRouter } from 'next/router';
import invariant from 'tiny-invariant';
import Button from '../Button';
import GenricDialog from '../GenricDialog';
import useDeleteTemplate from '../hooks/useDeleteTemplate';
import useGetWorkouts from '../hooks/useGetWorkouts';

const ConfirmStartNewWorkout = NiceModal.create(() => {
    const { visible, hide } = useModal();
    const { data: workouts } = useGetWorkouts();
    const { mutate } = useDeleteTemplate();
    const router = useRouter();
    const createWorkoutModal = useModal('workout/create-workout');

    const inProcessWorkouts = workouts?.filter((workout) => !workout.isDone && !workout.isTemplate);

    const onResumeTemplate = () => {
        invariant(inProcessWorkouts, 'inProcessWorkouts is undefined');
        router.push(`/workout/${inProcessWorkouts[0].id}`);
        hide();
    };

    const onStartNewTemplate = () => {
        invariant(inProcessWorkouts, 'inProcessWorkouts is undefined');
        mutate({ workoutId: inProcessWorkouts[0].id });
        hide();
        createWorkoutModal.show();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="flex justify-center items-center flex-col bg-slate-300 p-4 rounded-md">
                <h1>You have workout still in progress. Starting new workout will delete the workout in progress</h1>

                <div className="flex justify-center items-center">
                    <Button onClick={onResumeTemplate}>Resume Workout</Button>
                    <Button className="bg-red-500" onClick={onStartNewTemplate}>
                        Start New Workout
                    </Button>
                    <Button onClick={hide}>Cancel</Button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default ConfirmStartNewWorkout;
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import invariant from 'tiny-invariant';
import Button from '../Button';
import GenricDialog from '../GenricDialog';
import useDeleteTemplate from '../hooks/useDeleteTemplate';
import useGetWorkouts from '../hooks/useGetWorkouts';

const ConfirmStartNewTemplateWorkout = NiceModal.create(({workoutId}: {workoutId: string}) => {
    const { visible, hide } = useModal();
    const { data: workouts } = useGetWorkouts();
    const { mutate } = useDeleteTemplate();
    const router = useRouter();

    const inProcessWorkouts = workouts?.filter((workout) => !workout.isDone && !workout.isTemplate);

    const onResumeTemplate = () => {
        invariant(inProcessWorkouts, 'inProcessTemplates is undefined');
        router.push(`/workout/${inProcessWorkouts[0].id}`);
        hide();
    };

    const onStartNewTemplate = () => {
        invariant(inProcessWorkouts, 'inProcessTemplates is undefined');
        mutate({ workoutId: inProcessWorkouts[0].id });
        NiceModal.show(`workout/start-template-workout-${workoutId }`);
        hide();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="flex justify-center items-center flex-col bg-slate-300 p-4 rounded-md">
                <h1>You have workout still in progress. Starting new workout will delete the workout in progress</h1>

                <div className="flex justify-center items-center">
                    <Button onClick={onResumeTemplate}>Resume workout</Button>
                    <Button className="bg-red-500" onClick={onStartNewTemplate}>
                        Start workout from template
                    </Button>
                    <Button onClick={hide}>Cancel</Button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default ConfirmStartNewTemplateWorkout;
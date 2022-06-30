import DeleteTemplateButton from './DeleteTemplateButton';
import EditHistoryWorkout from './EditWorkoutButton';
import GenricMenu from './GenricMenu';
import useGetWorkouts from './hooks/useGetWorkouts';
import RenameTemplateButton from './RenameTemplateButton';
import ConfirmStartNewTemplateWorkout from './modals/ConfrimStartNewTemplateWorkout';
import StartTemplateWorkout from './modals/StartTemplateWorkout';
import {useModal} from '@ebay/nice-modal-react';

const FinishedTemplates = () => {
    const { isLoading, data: workouts } = useGetWorkouts();
    const startTemplateWorkoutModal = useModal(StartTemplateWorkout);
    const confirmStartNewTemplateWorkoutModal = useModal(ConfirmStartNewTemplateWorkout);

    const finishedTemplates = workouts?.filter((workout) => workout.isDone && workout.isTemplate);

    const workoutInProgress = workouts && workouts?.filter((workout) => !workout.isDone && !workout.isTemplate);

    const onStartWorkout = (workoutId: string) => {
        if (workoutInProgress && workoutInProgress?.length > 0) {
            confirmStartNewTemplateWorkoutModal.show({ workoutId });
            return;
        }

        startTemplateWorkoutModal.show({workoutId});
    };

    return (
        <div>
            <h1 className="text-center text-2xl">Finished Templates</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul className="mb-20 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {finishedTemplates &&
                        finishedTemplates.map((workout) => (
                            <div key={workout.id}>
                                <div className="aspect-w-1 aspect-h-1">
                                    <div>
                                        <button
                                            onClick={() => onStartWorkout(workout.id)}
                                            className="w-full h-full nav-link flex justify-center items-center bg-green-500/70 rounded-lg hover:bg-green-500 hover:text-green-200 text-xl"
                                        >
                                            {workout.name}
                                        </button>
                                        <GenricMenu>
                                            <EditHistoryWorkout workoutId={workout.id} isTemplate />
                                            <DeleteTemplateButton workoutId={workout.id} />
                                            <RenameTemplateButton workoutId={workout.id} />
                                        </GenricMenu>
                                    </div>
                                </div>
                            </div>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default FinishedTemplates;

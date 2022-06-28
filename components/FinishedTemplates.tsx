import { useAtom } from 'jotai';
import DeleteTemplateButton from './DeleteTemplateButton';
import EditHistoryWorkout from './EditWorkoutButton';
import GenricMenu from './GenricMenu';
import useGetWorkouts from './hooks/useGetWorkouts';
import DeleteTemplate from './modals/DeleteTemplate';
import RenameTemplate from './modals/RenameTemplate';
import RenameTemplateButton from './RenameTemplateButton';
import NiceModal from '@ebay/nice-modal-react';
import ConfirmStartNewTemplateWorkout from './modals/ConfrimStartNewTemplateWorkout';
import StartTemplateWorkout from './modals/StartTemplateWorkout';

const FinishedTemplates = () => {
    const { isLoading, data: workouts } = useGetWorkouts();

    const finishedTemplates = workouts?.filter((workout) => workout.isDone && workout.isTemplate);

    const workoutInProgress = workouts && workouts?.filter((workout) => !workout.isDone && !workout.isTemplate);

    const onStartWorkout = (workoutId: string) => {
        if (workoutInProgress && workoutInProgress?.length > 0) {
            NiceModal.show(`workout/confirm-start-new-template-workout-${workoutId }`);
            return;
        }

        NiceModal.show(`workout/start-template-workout-${workoutId }`);
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
                                    <DeleteTemplate id={`template/delete-${workout.id}`} workoutId={workout.id} />
                                    <RenameTemplate id={`template/rename-${workout.id}`} workoutId={workout.id} />
                                    <ConfirmStartNewTemplateWorkout id= {`workout/confirm-start-new-template-workout-${workout.id}`} workoutId={workout.id} />
                                    <StartTemplateWorkout id={`workout/start-template-workout-${workout.id}`} workoutId={workout.id} />
                                </div>
                            </div>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default FinishedTemplates;

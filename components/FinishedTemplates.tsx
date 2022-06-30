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

        startTemplateWorkoutModal.show({ workoutId });
    };

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul className="mb-20 grid gap-3 grid-cols-1 md:grid-cols-2 md:gap-4" >
                    {finishedTemplates &&
                        finishedTemplates.map((workout) => (
                            <div key={workout.id}>
                                <div className="aspect-w-2 aspect-h-1">
                                    <div>
                                        <button
                                            onClick={() => onStartWorkout(workout.id)}
                                            className="relative w-full h-full bg-rose-800 text-rose-200 rounded-lg overflow-hidden shadow-inner-2xl"
                                        >
                                            <div 
                                            className='absolute left-0 right-0 bottom-0 top-[calc(90%)] bg-gradient-to-t from-rose-800'
                                            />
                                            <div className="w-full h-full text-left p-2">
                                                <span className='font-bold'>{workout.name.toUpperCase()}</span>
                                                {workout.exercises.map((exercise) => (
                                                    <div key={exercise.id}>
                                                        <span className='text-rose-200/70 italic'>{exercise.name}</span>
                                                    </div>
                                                ))}
                                            </div>
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

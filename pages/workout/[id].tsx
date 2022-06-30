import Exercise from '../../components/Exercise';
import FinishWorkoutButton from '../../components/FinishWorkoutButton';
import CancelWorkoutButton from '../../components/CancelWorkoutButton';
import { useRouter } from 'next/router';
import useGetWorkout from '../../components/hooks/useGetWorkout';
import AddExercises from '../../components/modals/AddExercises';
import Button from '../../components/Button';
import { useModal } from '@ebay/nice-modal-react';

const Workout = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { data: workout } = useGetWorkout({ id });
    const addExercisesModal = useModal(AddExercises);

    return (
        <div>
            {workout && (
                <div>
                    <div className="flex justify-between">
                        <Button onClick={() => addExercisesModal.show({workoutId: id})}>Add Exercises</Button>
                        <FinishWorkoutButton {...workout} identifier="workout" />
                        <CancelWorkoutButton workoutId={workout.id} identifier="workout" />
                    </div>
                    <h2>Workout: {workout.name}</h2>
                    {/*//Todo: Add functionality to create custom exercises */}
                    {/* <AddExercise id={id} /> */}
                    <div className="grid grid-cols-2 gap-2">
                        {workout.exercises?.map((exercise: any) => (
                            <Exercise key={exercise.id} {...exercise} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Workout;

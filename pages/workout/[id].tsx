import Exercise from '../../components/Exercise';
import FinishWorkoutButton from '../../components/FinishWorkoutButton';
import CancelWorkoutButton from '../../components/CancelWorkoutButton';
import { useRouter } from 'next/router';
import useGetWorkout from '../../components/hooks/useGetWorkout';
import AddExercises from '../../components/modals/AddExercises';
import Button from '../../components/Button';
import { useModal } from '@ebay/nice-modal-react';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import WorkoutInputName from '../../components/WorkoutNameInput';

const Workout = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { data: workout } = useGetWorkout({ id });
    const addExercisesModal = useModal(AddExercises);

    return (
        <div>
            {/* Top header with back button */}
            <Link href="/">
                <a className="fixed standalone:top-[50px] top-5 left-2 right-0 z-10 flex justify-between items-center">
                    <IoIosArrowBack size={35} />
                </a>
            </Link>

            {workout && (
                <div>
                    <div className="">
                        <div className="mb-4 flex justify-between">
                            <CancelWorkoutButton workoutId={workout.id} identifier="workout" />
                            <FinishWorkoutButton {...workout} identifier="workout" />
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        <WorkoutInputName workoutName={workout.name} workoutId={workout.id} />
                    </div>
                    <div className='mb-4'>
                        {/*//Todo: Add functionality to create custom exercises */}
                        {/* <AddExercise id={id} /> */}
                        <div className="grid grid-col-1 sm:grid-cols-2 gap-3 sm:gap-2">
                            {workout.exercises?.map((exercise: any) => (
                                <Exercise key={exercise.id} {...exercise} />
                            ))}
                        </div>
                    </div>
                    <div className="text-center mb-32">
                        <button
                            className="bg-rose-200/70 text-rose-600 py-1 px-2 text-lg font-bold rounded-md w-52 drop-shadow-md border-[1px] border-rose-300/70"
                            onClick={() => addExercisesModal.show({ workoutId: id, isTemplate: false })}
                        >
                            Add Exercises
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Workout;

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import CancelWorkoutButton from "../../components/CancelWorkoutButton";
import {useModal} from '@ebay/nice-modal-react';
import AddExercises from "../../components/modals/AddExercises";
import { useAtomValue } from "jotai";
import { getWorkoutAtom } from "../../components/store/atoms";

const CreateTemplate = () => {
    const addExercisesModal = useModal(AddExercises);
    const workout = useAtomValue(getWorkoutAtom);

    return (
        <div>
                <div>
                    <div className="">
                        <div className="mb-4 flex justify-between">
                            <CancelWorkoutButton identifier="template" />
                            {/* <FinishWorkoutButton {...workout} identifier="workout" /> */}
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        {/* <WorkoutInputName workoutName={workout.name} workoutId={workout.id} /> */}
                    </div>
                    <div className='mb-4'>
                        {/*//Todo: Add functionality to create custom exercises */}
                        {/* <AddExercise id={id} /> */}
                        <div className="grid grid-col-1 sm:grid-cols-2 gap-3 sm:gap-2">
                            {/* {workout.exercises?.map((exercise: any) => (
                                <Exercise key={exercise.id} {...exercise} />
                            ))} */}
                        </div>
                    </div>
                    {/* <div className="text-center">
                        <button
                            className="bg-rose-200/70 text-rose-600 py-1 px-2 text-lg font-bold rounded-md w-52 drop-shadow-md border-[1px] border-rose-300/70"
                            onClick={() => addExercisesModal.show({ workoutId: id })}
                        >
                            Add Exercises
                        </button>
                    </div> */}
                </div>
        </div>
    );
};

export default CreateTemplate;
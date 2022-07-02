import { useRouter } from "next/router";
import Button from "../../../components/Button";
import CancelWorkoutButton from "../../../components/CancelWorkoutButton";
import Exercise from "../../../components/Exercise";
import FinishWorkoutButton from "../../../components/FinishWorkoutButton";
import useGetWorkout from "../../../components/hooks/useGetWorkout";
import AddExercises from "../../../components/modals/AddExercises";
import {useModal} from "@ebay/nice-modal-react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const EditHistoryWorkout = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { data: workout } = useGetWorkout({ id });
    const addExercisesModal = useModal(AddExercises);

    return (
        <div>
            {/* Top header with back button */}
            <Link href="/history">
                <a className="fixed top-5 standalone:top-[50px] left-2 right-0 z-10 flex justify-between items-center">
                    <IoIosArrowBack size={35} />
                </a>
            </Link>
            <div className="flex justify-between">
                <Button onClick={() => addExercisesModal.show({workoutId: id})}>Add Exercises</Button>
                {workout && <FinishWorkoutButton {...workout} identifier="history" />}
                <CancelWorkoutButton workoutId={id} identifier="history" />
            </div>
            {/*//Todo: Add functionality to create custom exercises */}
            {/* <AddExercise id={id} /> */}
            <div className="grid grid-col-1 sm:grid-cols-2 gap-3 sm:gap-2">
                {workout?.exercises?.map((exercise: any) => (
                    <Exercise key={exercise.id} {...exercise} />
                ))}
            </div>
        </div>
    );
};

export default EditHistoryWorkout;
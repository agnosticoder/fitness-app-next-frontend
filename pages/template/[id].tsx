import { useRouter } from "next/router";
import Button from "../../components/Button";
import CancelWorkoutButton from "../../components/CancelWorkoutButton";
import Exercise from "../../components/Exercise";
import useGetWorkout from "../../components/hooks/useGetWorkout";
import AddExercises from "../../components/modals/AddExercises";
import SaveTemplateButton from "../../components/SaveTemplateButton";
import {useModal} from "@ebay/nice-modal-react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const TemplateWorkout = () => {
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

            <div className="flex justify-between">
                <Button onClick={() => addExercisesModal.show({workoutId: id})}>Add Exercises</Button>
                {workout && <SaveTemplateButton {...workout} />}
                <CancelWorkoutButton workoutId={id} identifier="template" />
            </div>
            {/*//Todo: Add functionality to create custom exercises */}
            {/* <AddExercise id={id} /> */}
            <div className="grid grid-cols-2 gap-2">
                {workout?.exercises?.map((exercise: any) => (
                    <Exercise key={exercise.id} {...exercise} />
                ))}
            </div>
        </div>
    );
};

export default TemplateWorkout;
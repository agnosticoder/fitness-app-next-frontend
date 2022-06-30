import { useRouter } from "next/router";
import Button from "../../../components/Button";
import CancelWorkoutButton from "../../../components/CancelWorkoutButton";
import Exercise from "../../../components/Exercise";
import FinishWorkoutButton from "../../../components/FinishWorkoutButton";
import useGetWorkout from "../../../components/hooks/useGetWorkout";
import AddExercises from "../../../components/modals/AddExercises";
import {useModal} from "@ebay/nice-modal-react";

const EditHistoryWorkout = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { data: workout } = useGetWorkout({ id });
    const addExercisesModal = useModal(AddExercises);

    return (
        <div>
            <div className="flex justify-between">
                <Button onClick={() => addExercisesModal.show({workoutId: id})}>Add Exercises</Button>
                {workout && <FinishWorkoutButton {...workout} identifier="history" />}
                <CancelWorkoutButton workoutId={id} identifier="history" />
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

export default EditHistoryWorkout;
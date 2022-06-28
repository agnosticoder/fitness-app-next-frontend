import { useRouter } from "next/router";
import AddExerciseModal from "../../../components/AddExercisesModal";
import CancelWorkoutButton from "../../../components/CancelWorkoutButton";
import Exercise from "../../../components/Exercise";
import FinishWorkoutButton from "../../../components/FinishWorkoutButton";
import useGetWorkout from "../../../components/hooks/useGetWorkout";

const EditHistoryWorkout = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const {data: workout} = useGetWorkout({id});

    console.log('workout', workout);


    return (
        <div>
            <div className="flex justify-between">
                <AddExerciseModal workoutId={id}/>
                {workout && <FinishWorkoutButton {...workout} identifier='history'/>}
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
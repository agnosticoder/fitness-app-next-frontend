import { useRouter } from "next/router";
import invariant from "tiny-invariant";
import AddExercisesModal from "../../components/AddExercisesModal";
import CancelWorkoutButton from "../../components/CancelWorkoutButton";
import Exercise from "../../components/Exercise";
import FinishWorkoutButton from "../../components/FinishWorkoutButton";
import useGetWorkout from "../../components/hooks/useGetWorkout";
import SaveTemplateButton from "../../components/SaveTemplateButton";

const TemplateWorkout = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const {data: workout} = useGetWorkout({ id });

    return (
        <div>
            <div className="flex justify-between">
                <AddExercisesModal workoutId={id}/>
                {workout && <SaveTemplateButton {...workout}/>}
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
import Button from "./Button";
import useGetWorkouts from "./hooks/useGetWorkouts";
import invariant from "tiny-invariant";
import { useModal } from "@ebay/nice-modal-react";
import ConfirmStartNewWorkout from "./modals/ConfirmStartNewWorkout";

const CreateWorkoutButton = () => {
    const { data: workouts } = useGetWorkouts();
    const confirmStartNewWorkoutModal = useModal('workout/confirm-start-new-workout');
    const createWorkoutModal = useModal('workout/create-workout');

    const inProcessWorkouts = workouts?.filter((workout) => !workout.isDone && !workout.isTemplate);

    const onCreateWorkout = () => {
        invariant(inProcessWorkouts, 'inProcessWorkouts is undefined');
        const isWorkoutInProcess = inProcessWorkouts?.length > 0;
        if (isWorkoutInProcess) {
            confirmStartNewWorkoutModal.show();
            return;
        }

        createWorkoutModal.show();
    };

    return (
        <div>
            <ConfirmStartNewWorkout id="workout/confirm-start-new-workout" />
            <Button onClick={onCreateWorkout}>Create Workout</Button>
        </div>
    );
};

export default CreateWorkoutButton;

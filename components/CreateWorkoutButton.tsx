import Button from "./Button";
import useGetWorkouts from "./hooks/useGetWorkouts";
import invariant from "tiny-invariant";
import { useModal } from "@ebay/nice-modal-react";
import ConfirmStartNewWorkout from "./modals/ConfirmStartNewWorkout";
import { IoIosFitness, IoMdFitness } from 'react-icons/io';
import useCreateWorkout from "./hooks/useCreateWorkout";
import { getWorkoutName } from "../lib/getWorkoutName";

const CreateWorkoutButton = () => {
    const { data: workouts } = useGetWorkouts();
    const {mutate} = useCreateWorkout();
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

        mutate({name: getWorkoutName()});
        // createWorkoutModal.show();
    };

    return (
        <div>
            <ConfirmStartNewWorkout id="workout/confirm-start-new-workout" />
            <button
                type="button"
                className="bg-rose-500 text-rose-100 p-2 text-xl rounded-md"
                onClick={onCreateWorkout}
            >
                <div className="flex items-center gap-2">
                    <span className="inline-block">Start New Workout</span>
                    <span className="inline-block">
                        <IoMdFitness size={25} />
                    </span>
                </div>
            </button>
        </div>
    );
};

export default CreateWorkoutButton;

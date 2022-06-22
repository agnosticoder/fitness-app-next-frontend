import { useRouter } from "next/router";
import Button from "./Button";
import useDeleteWorkout from "./hooks/useDeleteWorkout";

const CancelWorkoutButton = ({workoutId}: {workoutId: string}) => {
    const {mutate} = useDeleteWorkout();
    const router = useRouter();

    const onCancelWorkout = () => {
        const isConfirmed = confirm('Are you sure you want to cancel this workout?');
        if(isConfirmed) {
            mutate({workoutId});
            router.push('/');
        }
    };

    return <Button onClick={onCancelWorkout} className="bg-red-500 text-red-200" type="button">Cancel Workout</Button>;
};

export default CancelWorkoutButton;
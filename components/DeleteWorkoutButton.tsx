import Button from "./Button";
import useDeleteWorkout from "./hooks/useDeleteWorkout";

const DeleteWorkoutButton = ({workoutId}: {workoutId: string}) => {
    const {mutate} = useDeleteWorkout();

    const onDeleteWorkout = async (workoutId: string) => {
        const isConfirm = confirm('Are you sure you want to delete this workout?');
        if(isConfirm) {
            mutate({workoutId});
        }
    };

    return (
        <Button className="block mx-auto" onClick={() => onDeleteWorkout(workoutId)}>
            Delete
        </Button>
    );
};

export default DeleteWorkoutButton;

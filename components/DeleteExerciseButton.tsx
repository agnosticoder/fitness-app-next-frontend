import { FormEvent } from "react";
import Button from "./Button";
import useDeleteExercise from "./hooks/useDeleteExercise";

const DeleteExerciseButton = ({ exerciseId }: { exerciseId: string }) => {
    const { mutate } = useDeleteExercise();

    const onDeleteExercise = (e: FormEvent) => {
        e.preventDefault();
        const isConfirm = confirm('Are you sure to delete this exercise?');

        mutate({ exerciseId });
    };

    return (
        <form onSubmit={onDeleteExercise}>
            <div className="w-full">
                <Button className="block w-full bg-red-500 text-white" type="submit">
                    Delete Exercise
                </Button>
            </div>
        </form>
    );
};

export default DeleteExerciseButton;

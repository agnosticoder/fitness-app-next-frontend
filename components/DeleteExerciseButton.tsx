import { FormEvent } from 'react';
import Button from './Button';
import { useModal } from '@ebay/nice-modal-react';

const DeleteExerciseButton = ({ exerciseId }: { exerciseId: string }) => {
    const deleteExerciseModal = useModal(`exercise/delete-${exerciseId}`);

    const onDeleteExercise = (e: FormEvent) => {
        e.preventDefault();
        deleteExerciseModal.show();
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

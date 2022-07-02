import { FormEvent } from 'react';
import Button from './Button';
import { useModal } from '@ebay/nice-modal-react';
import DeleteExercise from './modals/DeleteExercise';

const DeleteExerciseButton = ({ exerciseId }: { exerciseId: string }) => {
    const deleteExerciseModal = useModal(DeleteExercise);

    const onDeleteExercise = (e: FormEvent) => {
        e.preventDefault();
        deleteExerciseModal.show({exerciseId});
    };

    return (
        <form onSubmit={onDeleteExercise}>
            <div className="">
                <button className="absolute bottom-2 left-2 py-1 px-2 text-sm font-bold bg-red-500 text-zinc-200 rounded-md" type="submit">
                    Delete Exercise
                </button>
            </div>
        </form>
    );
};

export default DeleteExerciseButton;

import NiceModal, { useModal} from '@ebay/nice-modal-react';
import GenricDialog from '../GenricDialog';
import useDeleteExercise from '../hooks/useDeleteExercise';

const DeleteExercise = NiceModal.create(({ exerciseId }: { exerciseId: string }) => {
    const { visible, hide } = useModal();
    const {mutate} = useDeleteExercise();

    const onDeleteExercise = () => {
        if (exerciseId) {
            mutate({ exerciseId });
        }
        hide();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Delete Exercise</h1>
                <p className="text-lg">Are you sure you want to delete the Exercise?</p>
                <div className="flex justify-center">
                    <button
                        onClick={onDeleteExercise}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                    <button
                        onClick={hide}
                        className="bg-gray-200 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-4"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default DeleteExercise;
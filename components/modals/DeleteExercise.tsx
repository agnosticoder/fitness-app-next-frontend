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
            <div className="text-center max-w-xs bg-zinc-800 text-zinc-200 p-4 rounded-md drop-shadow-2xl">
                <h1 className="text-2xl font-semibold mb-2">Delete Exercise?</h1>
                <h2 className='font-semibold mb-4'>Are you sure you want to delete the Exercise?</h2>
                <div className="flex justify-around items-center mx-6">
                    <button className='bg-zinc-500 px-3 py-1 rounded drop-shadow-md' onClick={hide}>Cancel</button>
                    <button className="bg-red-500 px-3 py-1 rounded drop-shadow-md" onClick={onDeleteExercise}>
                        Delete
                    </button>
                </div>
            </div>
            {/* <div className="text-center">
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
            </div> */}
        </GenricDialog>
    );
});

export default DeleteExercise;
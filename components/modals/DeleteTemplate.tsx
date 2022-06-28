import NiceModal, { useModal } from "@ebay/nice-modal-react";
import GenricDialog from "../GenricDialog";
import useDeleteWorkout from "../hooks/useDeleteWorkout";

const DeleteTemplate = NiceModal.create(({ workoutId }: { workoutId: string }) => {
    const { visible, hide } = useModal();
    const {mutate} = useDeleteWorkout();

    const onDeleteTemplate = () => {
        if(workoutId.length > 0) {
            mutate({workoutId});
        }
        hide();
    }

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Delete History</h1>
                <p className="text-lg">Are you sure you want to delete your history?</p>
                <div className="flex justify-center">
                    <button onClick={onDeleteTemplate} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                    <button onClick={hide} className="bg-gray-200 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-4">
                        Cancel
                    </button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default DeleteTemplate;
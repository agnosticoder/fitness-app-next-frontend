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
            <div className="text-center max-w-xs bg-zinc-800 text-zinc-200 p-4 rounded-md drop-shadow-2xl">
                <h1 className="text-2xl font-semibold mb-2">
                    Delete Template
                </h1>
                <h2 className="font-semibold mb-4">Are you sure you want to delete your template?</h2>

                <div className="flex justify-around items-center mx-6">
                    <button className="bg-zinc-500 px-3 py-1 rounded drop-shadow-md" onClick={hide}>
                        Cancel
                    </button>
                    <button className="bg-red-500 px-3 py-1 rounded drop-shadow-md" onClick={onDeleteTemplate}>
                        Delete
                    </button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default DeleteTemplate;
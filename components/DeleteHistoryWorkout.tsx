import { Menu } from "@headlessui/react";
import { AiFillDelete } from "react-icons/ai";
import { useModal } from "@ebay/nice-modal-react";

const DeleteHistoryWorkout = ({ workoutId }: { workoutId: string }) => {
    const deleteHistoryModal = useModal(`workout/delete-history-${workoutId}`);

    const onDelete = () => {
        deleteHistoryModal.show();
    };

    return (
        <Menu.Item>
            {({ active }: { active: boolean }) => (
                <button onClick={onDelete} className={`${active ? 'bg-blue-500' : 'bg-blue-200'} rounded text-left p-1`}>
                    <AiFillDelete className="inline-block mr-2" />
                    Delete
                </button>
            )}
        </Menu.Item>
    );
};

export default DeleteHistoryWorkout;

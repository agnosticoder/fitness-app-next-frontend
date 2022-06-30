import { Menu } from "@headlessui/react";
import { AiFillDelete } from "react-icons/ai";
import { useModal } from "@ebay/nice-modal-react";
import DeleteHisotory from "./modals/DeleteHistory";

const DeleteHistoryWorkout = ({ workoutId }: { workoutId: string }) => {
    const deleteHistoryModal = useModal(DeleteHisotory);

    const onDelete = () => {
        setTimeout(() => {
            deleteHistoryModal.show({ workoutId });
        }, 50);
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

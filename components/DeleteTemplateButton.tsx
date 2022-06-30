import { Menu } from '@headlessui/react';
import { AiFillDelete } from 'react-icons/ai';
import { useModal } from '@ebay/nice-modal-react';
import DeleteTemplate from './modals/DeleteTemplate';

const DeleteTemplateButton = ({ workoutId }: { workoutId: string }) => {
    const deleteTemplateModal = useModal(DeleteTemplate);


    const onDelete = () => {
        // becuase we are using it to open modal, opening it little bit later won't cause the not focused modal problem
        setTimeout(() => {
            deleteTemplateModal.show({ workoutId });
        }, 50);
    };

    return (
        <Menu.Item>
            {({ active }: { active: boolean }) => (
                <button
                    onClick={onDelete}
                    className={`rounded text-left p-1`}
                >
                    <AiFillDelete className="inline-block mr-2" />
                    Delete
                </button>
            )}
        </Menu.Item>
    );
};

export default DeleteTemplateButton;

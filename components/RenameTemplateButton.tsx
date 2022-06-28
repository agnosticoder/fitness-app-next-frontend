import { Menu } from '@headlessui/react';
import { BiRename } from 'react-icons/bi';
import { useModal } from '@ebay/nice-modal-react';

const RenameTemplateButton = ({ workoutId }: { workoutId: string }) => {
    const renameTemplateModal = useModal(`template/rename-${workoutId}`);

    const onRename = () => {
        renameTemplateModal.show();
    };

    return (
        <Menu.Item>
            {({ active }: { active: boolean }) => (
                <button
                    onClick={onRename}
                    className={`${active ? 'bg-blue-500' : 'bg-blue-200'} rounded text-left p-1`}
                >
                    <BiRename className="inline-block mr-2" />
                    Rename
                </button>
            )}
        </Menu.Item>
    );
};

export default RenameTemplateButton;

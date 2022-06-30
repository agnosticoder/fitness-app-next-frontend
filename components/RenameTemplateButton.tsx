import { Menu } from '@headlessui/react';
import { BiRename } from 'react-icons/bi';
import { useModal } from '@ebay/nice-modal-react';
import RenameTemplate from './modals/RenameTemplate';

const RenameTemplateButton = ({ workoutId }: { workoutId: string }) => {
    const renameTemplateModal = useModal(RenameTemplate);

    const onRename = () => {
        setTimeout(() => {
            renameTemplateModal.show({ workoutId });
        }, 50);
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

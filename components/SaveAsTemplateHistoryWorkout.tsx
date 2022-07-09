import { Menu } from '@headlessui/react';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { useModal } from '@ebay/nice-modal-react';
import SaveAsTemplate from './modals/SaveAsTemplate';

const SaveAsTemplateHistoryWorkout = ({ workoutId }: { workoutId: string }) => {
    const saveAsTemplateModal = useModal(SaveAsTemplate);

    const onSaveAsTemplate = () => {
        setTimeout(() => {
            saveAsTemplateModal.show({ workoutId });
        }, 50);
    };

    return (
            <Menu.Item>
                {({ active }: { active: boolean }) => (
                    <button
                        onClick={onSaveAsTemplate}
                        className={`rounded text-left p-1`}
                    >
                        <BiMessageSquareAdd className="inline-block mr-2" />
                        Save as Template
                    </button>
                )}
            </Menu.Item>
    );
};

export default SaveAsTemplateHistoryWorkout;

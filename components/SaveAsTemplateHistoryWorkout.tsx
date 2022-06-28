import { Menu } from '@headlessui/react';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { useModal } from '@ebay/nice-modal-react';

const SaveAsTemplateHistoryWorkout = ({ workoutId }: { workoutId: string }) => {
    const saveAsTemplateModal = useModal(`workout/save-as-template-${workoutId}`);

    const onSaveAsTemplate = () => {
        saveAsTemplateModal.show();
    };

    return (
        <div>
            <Menu.Item>
                {({ active }: { active: boolean }) => (
                    <button
                        onClick={onSaveAsTemplate}
                        className={`${active ? 'bg-blue-500' : 'bg-blue-200'} rounded text-left p-1`}
                    >
                        <BiMessageSquareAdd className="inline-block mr-2" />
                        Save as Template
                    </button>
                )}
            </Menu.Item>
        </div>
    );
};

export default SaveAsTemplateHistoryWorkout;

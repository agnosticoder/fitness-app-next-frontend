import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import Button from './Button';
import CreateWorkout from './CreateWorkout';
import { useErrorMessageStore } from './store/errorMessageStore';

const CreateWorkoutModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [, setError] = useErrorMessageStore();

    const onCloseDialog = () => {
        const close = confirm('Are you sure to dismiss this?');
        if (close) setIsOpen(false);
        setError('');
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={onCloseDialog} className="fixed z-10 inset-0">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                {/* Style the following component according to your needs */}
                <CreateWorkout />
            </Dialog>
            <Button onClick={() => setIsOpen(true)}>Create Workout</Button>
        </div>
    );
};

export default CreateWorkoutModal;

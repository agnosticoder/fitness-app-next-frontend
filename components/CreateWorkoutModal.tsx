import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import Button from './Button';
import ConfirmDialog from './ConfirmDialog';
import CreateWorkout from './CreateWorkout';

const CreateWorkoutModal = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const onCloseDialog = () => {
        setIsConfirmDialogOpen(true);
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={onCloseDialog} className="z-50">
                {/* backdrop */}
                <div className='fixed inset-0 bg-slate-500/50' aria-hidden={true} />
                {/* Style the following component according to your needs */}
                <CreateWorkout />

                {/* ConfirmDialog */}
                {isConfirmDialogOpen &&
                    <ConfirmDialog
                        isConfirmDialogOpen={isConfirmDialogOpen}
                        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
                        setIsDialogOpen={setIsDialogOpen} />}
            </Dialog>

            <Button onClick={() => setIsDialogOpen(true)}>Create Workout</Button>
        </div>
    );
};

export default CreateWorkoutModal;

import { Dialog } from '@headlessui/react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import Button from './Button';
import ChooseExercises from './ChooseExercisesBrowser';
import ConfirmDialog from './ConfirmDialog';
import useCreateExercises from './hooks/useCreateExercises';
import { selectedExercisesAtom } from './store/atoms';

interface AddExerciseModalProps {
    workoutId: string;
}

const AddExerciseModal = ({workoutId}: AddExerciseModalProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [selectedExercises] = useAtom(selectedExercisesAtom);
    const {mutate, data} = useCreateExercises();

    const onCloseDialog = () => {
        setIsConfirmDialogOpen(true);
    };

    const onAddExercises = () => {
        mutate({workoutId, exercises: selectedExercises});
        setIsDialogOpen(false);
    }

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={onCloseDialog} className="z-50">
                {/* backdrop */}
                <div className='fixed inset-0 bg-slate-500/50' aria-hidden={true} />
                <div className="fixed inset-0 flex justify-center items-center">
                    <Dialog.Panel className="bg-slate-300 p-4 rounded-md w-80">
                        <h1 className='text-3xl'>Add your Exercises</h1>
                        <ChooseExercises />
                        <div>
                            <Button onClick={onAddExercises} type="button">Add Exercises</Button>
                        </div>
                    </Dialog.Panel>
                </div>

                {/* ConfirmDialog */}
                {isConfirmDialogOpen &&
                    <ConfirmDialog
                        isConfirmDialogOpen={isConfirmDialogOpen}
                        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
                        setIsDialogOpen={setIsDialogOpen} />}
            </Dialog>
            <Button onClick={() => setIsDialogOpen(true)}>Add Exercises</Button>
        </div>
    );
};

export default AddExerciseModal;
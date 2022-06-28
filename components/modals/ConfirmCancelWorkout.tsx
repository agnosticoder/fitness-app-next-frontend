import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useRouter } from 'next/router';
import Button from '../Button';
import GenricDialog from '../GenricDialog';
import useDeleteWorkout from '../hooks/useDeleteWorkout';

interface ConfirmCancelWorkoutProps {
    workoutId: string;
    identifier: 'template' | 'history' | 'workout';
}

const ConfirmCancelWorkout = NiceModal.create(({workoutId, identifier}:ConfirmCancelWorkoutProps) => {
    const {visible, hide} = useModal();
    const { mutate } = useDeleteWorkout();
    const router = useRouter();

    const onCancelWorkout = () => {
        hide();
        mutate({ workoutId });
        router.push('/');
    }

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="flex justify-center items-center flex-col bg-slate-300 p-4 rounded-md">
                <h1>
                    Are you sure you want to {identifier && 'delete'} this{' '}
                    {identifier === 'history' ? 'workout history' : 'template'}?
                </h1>

                <div className="flex justify-center items-center">
                    <Button onClick={hide}>No</Button>
                    <Button className="bg-red-500" onClick={onCancelWorkout}>
                        Yes
                    </Button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default ConfirmCancelWorkout;
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import Button from '../Button';
import GenricDialog from '../GenricDialog';
import useDeleteWorkout from '../hooks/useDeleteWorkout';
import { dispatchWorkoutAtom } from '../store/atoms';

interface ConfirmCancelWorkoutProps {
    workoutId?: string;
    identifier: 'template' | 'history' | 'workout';
}

const ConfirmCancelWorkout = NiceModal.create(({workoutId, identifier}:ConfirmCancelWorkoutProps) => {
    const {visible, hide} = useModal();
    const { mutate } = useDeleteWorkout();
    const router = useRouter();
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    const onCancelWorkout = () => {
        hide();
        workoutId && mutate({ workoutId });

        if (identifier === 'template') {
            dispatchWorkout({type: 'RESET_WORKOUT'});
        }
        router.push('/');
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="text-center max-w-xs bg-zinc-800 text-zinc-200 p-4 rounded-md drop-shadow-2xl">
                <h1 className="text-2xl font-semibold mb-2">Delete 
                    {identifier === 'history' ? ' Workout History' : identifier === 'template' ? ' Template': ' Workout'}?
                </h1>
                <h2 className='font-semibold mb-4'>
                    Are you sure you want to {identifier && 'delete'} this{' '}
                    {identifier === 'history' ? 'workout history' : identifier === 'template' ? 'template': 'workout'}?
                </h2>

                <div className="flex justify-around items-center mx-6">
                    <button className='bg-zinc-500 px-3 py-1 rounded drop-shadow-md' onClick={hide}>Cancel</button>
                    <button className="bg-red-500 px-3 py-1 rounded drop-shadow-md" onClick={onCancelWorkout}>
                        Delete
                    </button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default ConfirmCancelWorkout;
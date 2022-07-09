import Button from "./Button";
import ConfirmCancelWorkout from "./modals/ConfirmCancelWorkout";
import {useModal} from '@ebay/nice-modal-react';


export type Identifier = {
    identifier: 'history' | 'workout' | 'template';
    workoutId: string;
};

const CancelWorkoutButton = ({
    workoutId,
    identifier,
}: {
    workoutId?: string;
    identifier: 'template' | 'history' | 'workout';
}) => {
    const modal = useModal(ConfirmCancelWorkout);

    return (
        <div>
            <button onClick={() => modal.show({identifier, workoutId})} 
            className="bg-red-500 text-zinc-100 font-bold py-1 px-2 rounded-md"
            type="button">
                {identifier === 'workout' ? 'Cancel Workout' : 'Delete'}
            </button>
        </div>
    );
};

export default CancelWorkoutButton;
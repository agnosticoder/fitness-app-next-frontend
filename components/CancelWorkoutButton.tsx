import Button from "./Button";
import ConfirmCancelWorkout from "./modals/ConfirmCancelWorkout";
import {useModal} from '@ebay/nice-modal-react';

const CancelWorkoutButton = ({
    workoutId,
    identifier,
}: {
    workoutId: string;
    identifier: 'template' | 'history' | 'workout';
}) => {
    const modal = useModal(ConfirmCancelWorkout);

    return (
        <div>
            <Button onClick={() => modal.show({identifier, workoutId})} className="bg-red-500 text-red-200" type="button">
                {identifier === 'workout' ? 'Cancel Workout' : 'Delete'}
            </Button>
        </div>
    );
};

export default CancelWorkoutButton;
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import { useAtom } from 'jotai';
import Button from '../Button';
import ChooseExercises from '../ChooseExercises';
import GenricDialog from '../GenricDialog';
import useCreateExercises from '../hooks/useCreateExercises';
import { confirmDialogAtom, selectedExercisesAtom } from '../store/atoms';
import Confrim from './Confirm';

const AddExercises = NiceModal.create(({workoutId}: {workoutId: string}) => {
    const { visible, hide } = useModal();
    const [selectedExercises] = useAtom(selectedExercisesAtom);
    const { mutate, data } = useCreateExercises();
    const [, setConfirmDialog] = useAtom(confirmDialogAtom);

    const onAddExercises = () => {
        mutate({ workoutId, exercises: selectedExercises });
        hide();
    };

    return (
        <div>
            <GenricDialog isOpen={visible}>
                    <h1 className="text-3xl">Add your Exercises</h1>
                    <ChooseExercises />
                    <div>
                        <Button onClick={onAddExercises} type="button">
                            Add Exercises
                        </Button>
                        <Button onClick={() => setConfirmDialog(true)} type="button">
                            Close
                        </Button>
                    </div>
                <Confrim hide={() => hide()}/>
            </GenricDialog>
        </div>
    );
});

export default AddExercises;
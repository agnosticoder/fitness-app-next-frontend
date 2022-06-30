import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import ChooseExercises from '../ChooseExercises';
import GenricDialog from '../GenricDialog';
import useCreateTemplate from '../hooks/useCreateTemplate';
import { confirmDialogAtom, selectedExercisesAtom } from '../store/atoms';
import Confrim from './Confirm';

interface Inputs {
    workoutName: string;
}

const CreateTemplate = NiceModal.create(() => {
    const { visible, hide } = useModal();
    const { mutate } = useCreateTemplate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();
    const [selectedExercises] = useAtom(selectedExercisesAtom);
    const [, setConfirmDialog] = useAtom(confirmDialogAtom);

    const onSubmit = ({ workoutName }: Inputs) => {
        console.log('Submit');
        console.log('selectedExercises', selectedExercises);
        mutate({ name: workoutName, exercises: selectedExercises });
        hide();
    };

    return (
        <>
            <GenricDialog isOpen={visible}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            className="p-2 w-full rounded"
                            type="text"
                            placeholder="Template Name"
                            {...register('workoutName', { required: 'required' })}
                        />
                        <span className="text-red-500">{errors.workoutName && errors.workoutName.message}</span>
                    </div>
                    <ChooseExercises />
                    <Button type="submit">Create Template</Button>
                    <Button
                        onClick={() => {
                            setConfirmDialog(true);
                        }}
                        type="button"
                    >
                        Close
                    </Button>
                </form>
                <Confrim hide={() => hide()} reset={() => reset()}/>
            </GenricDialog>
        </>
    );
});

export default CreateTemplate;
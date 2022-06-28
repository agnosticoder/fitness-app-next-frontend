import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import ChooseExercises from '../ChooseExercises';
import GenricDialog from '../GenricDialog';
import useCreateTemplate from '../hooks/useCreateTemplate';
import { useSelectedExercisesStore } from '../store/selectedExercisesStore';
import ConfirmClose from './ConfirmClose';

interface Inputs {
    workoutName: string;
}

const CreateTemplate = NiceModal.create(() => {
    const { visible, hide } = useModal();
    const confirmClose = useModal('template/confirm-close-create-template');
    const { mutate } = useCreateTemplate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();
    const [selectedExercises] = useSelectedExercisesStore();

    const onSubmit = ({ workoutName }: Inputs) => {
        console.log('Submit');
        console.log('selectedExercises', selectedExercises);
        mutate({ name: workoutName, exercises: selectedExercises });
        hide();
    };

    return (
        <>
            <GenricDialog isOpen={visible} setIsOpen={() => confirmClose.show()}>
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
                            confirmClose.show();
                        }}
                        type="button"
                    >
                        Close
                    </Button>
                </form>
            </GenricDialog>
            <ConfirmClose id='template/confirm-close-create-template' hideDialog={hide} reset={reset}/>
        </>
    );
});

export default CreateTemplate;
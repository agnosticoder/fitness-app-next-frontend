import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import GenricDialog from '../GenricDialog';
import useGetWorkout from '../hooks/useGetWorkout';
import useSaveHistoryWorkoutAsTemplate from '../hooks/useSaveHistoryWorkoutAsTemplate';

type Input = {wourkoutName: string};

const SaveAsTemplate = NiceModal.create(({workoutId}: {workoutId: string}) => {
    const { visible, hide } = useModal();
    const {mutate} = useSaveHistoryWorkoutAsTemplate();
    const {data: workout} = useGetWorkout({id: workoutId});
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<Input>();

    useEffect(() => {
        if (visible) {
            reset({ wourkoutName: workout?.name });
        }
    }, [reset, visible, workout?.name]);

    const onSaveAsTemplate = ({ wourkoutName }: Input) => {
        const workoutCopy = workout && { ...workout, name: wourkoutName };
        workoutCopy && mutate(workoutCopy)
        hide();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <h1>Save as template</h1>
            <p>Choose a name for the template</p>
            <form onSubmit={handleSubmit(onSaveAsTemplate)}>
                <input type="text" placeholder="Template Name" {...register('wourkoutName', { required: true })} />
                {errors.wourkoutName && <p className="text-red-500">This is required</p>}
                <Button type="submit">Save</Button>
                <Button type="button" onClick={hide}>
                    Cancel
                </Button>
            </form>
        </GenricDialog>
    );
});

export default SaveAsTemplate;
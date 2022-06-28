import NiceModal, { useModal} from '@ebay/nice-modal-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import GenricDialog from '../GenricDialog';
import useGetWorkout from '../hooks/useGetWorkout';
import useUpdateWorkout from '../hooks/useUpdateWorkout';

type Input = {
    name: string
}

const RenameTemplate = NiceModal.create(({ workoutId }: { workoutId: string }) => {
    const { visible, hide } = useModal();

    const {register, reset, handleSubmit, formState: {errors}} = useForm<Input>()
    const {data: workout} = useGetWorkout({id: workoutId});
    const {mutate} = useUpdateWorkout();

    useEffect(() => {
        if (visible) {
            reset({name: workout?.name});
        }
    }, [workoutId, workout?.name, visible, reset]);

    const onSubmit = ({name}: Input) => {
        mutate({id: workoutId, name});
        hide();
        reset({name: ''});
    };

    const onCancel = () => {
        reset();
        hide();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Rename Template</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        className="w-full p-2 mb-2"
                        placeholder="Template Name"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">required</p>}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Rename
                        </button>
                        <button
                            onClick={onCancel}
                            type="button"
                            className="bg-gray-200 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-4"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </GenricDialog>
    );
});

export default RenameTemplate;
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

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Input>();
    const { data: workout } = useGetWorkout({ id: workoutId });
    const { mutate } = useUpdateWorkout();

    useEffect(() => {
        if (visible) {
            reset({ name: workout?.name });
        }
    }, [workoutId, workout?.name, visible, reset]);

    const onSubmit = ({ name }: Input) => {
        mutate({ id: workoutId, name });
        hide();
        reset({ name: '' });
    };

    const onCancel = () => {
        reset();
        hide();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="text-center w-80 bg-zinc-800 text-zinc-200 p-4 rounded-md drop-shadow-2xl">
                <h1 className="text-2xl font-semibold mb-2">Rename Template</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='relative'>
                        <input
                            type="text"
                            className="w-full p-2 mb-8 rounded-md text-zinc-700 placeholder:text-zinc-300"
                            placeholder="Template Name"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <p className="absolute bottom-3 text-red-500 text-sm">required</p>}
                    </div>
                    <div className="flex justify-around items-center mx-6">
                        <button
                            className="bg-zinc-500 px-3 py-1 rounded drop-shadow-md"
                            onClick={onCancel}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button className="bg-green-500 px-3 py-1 rounded drop-shadow-md" type="submit">
                            Rename
                        </button>
                    </div>
                </form>
            </div>
        </GenricDialog>
    );
});

export default RenameTemplate;
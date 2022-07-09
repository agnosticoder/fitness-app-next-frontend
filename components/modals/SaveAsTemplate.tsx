import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import GenricDialog from '../GenricDialog';
import useGetWorkout from '../hooks/useGetWorkout';
import useSaveHistoryWorkoutAsTemplate from '../hooks/useSaveHistoryWorkoutAsTemplate';

type Input = {workoutName: string};

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
            reset({ workoutName: workout?.name });
        }
    }, [reset, visible, workout?.name]);

    const onSaveAsTemplate = ({ workoutName }: Input) => {
        const workoutCopy = workout && { ...workout, name: workoutName };
        workoutCopy && mutate(workoutCopy)
        hide();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            {/* <h1>Save as template</h1>
            <p>Choose a name for the template</p>
            <form onSubmit={handleSubmit(onSaveAsTemplate)}>
                <input type="text" placeholder="Template Name" {...register('workoutName', { required: true })} />
                {errors.workoutName && <p className="text-red-500">This is required</p>}
                <Button type="submit">Save</Button>
                <Button type="button" onClick={hide}>
                    Cancel
                </Button>
            </form> */}
            <div className="text-center w-80 bg-zinc-800 text-zinc-200 p-4 rounded-md drop-shadow-2xl">
                <h1 className="text-2xl font-semibold mb-2">Save as template</h1>
                <form onSubmit={handleSubmit(onSaveAsTemplate)}>
                    <div className='relative'>
                        <input
                            type="text"
                            className="w-full p-2 mb-8 rounded-md text-zinc-700 placeholder:text-zinc-300"
                            placeholder="Template Name"
                            {...register('workoutName', { required: true })}
                        />
                        {errors.workoutName && <p className="absolute bottom-3 text-red-500 text-sm">required</p>}
                    </div>
                    <div className="flex justify-around items-center mx-6">
                        <button
                            className="bg-zinc-500 px-3 py-1 rounded drop-shadow-md"
                            onClick={hide}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button className="bg-green-500 px-3 py-1 rounded drop-shadow-md" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </GenricDialog>
    );
});

export default SaveAsTemplate;
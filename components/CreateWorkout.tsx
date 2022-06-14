import { Dialog } from "@headlessui/react";
import { useForm } from 'react-hook-form';
import Button from "./Button";
import ChooseExercises from "./ChooseExercises";
import useCreateWorkout from './hooks/useCreateWorkout';
import { useSelectedExercisesStore } from './store/selectedExercisesStore';

interface Inputs{
    workoutName: string;
}

const CreateWorkout = () => {
    const { mutate } = useCreateWorkout();
    const [selectedExercises] = useSelectedExercisesStore();
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();

    return <>
        {/* container to to center the actual Modal (Panel) */}
        <div className="fixed inset-0 flex justify-center items-center">
            <Dialog.Panel className="bg-slate-300 p-4 rounded-md w-80">
                <Dialog.Title>Create Workout</Dialog.Title>
                <Dialog.Description>Please start adding exercises and more</Dialog.Description>
                <form onSubmit={handleSubmit(({workoutName}) => {
                    mutate({name: workoutName, exercises: selectedExercises});
                })}>
                    <input
                        className="p-2 w-full rounded"
                        type="text"
                        placeholder="Workout Name"
                        {...register('workoutName', { required: 'required' })}
                    />
                    {errors.workoutName && <span className="text-red-500">{errors.workoutName.message}</span>}
                    <ChooseExercises />
                    <div>
                        <Button type="submit">Create Workout</Button>
                    </div>
                </form>
            </Dialog.Panel>
        </div>
    </>;
};

export default CreateWorkout;

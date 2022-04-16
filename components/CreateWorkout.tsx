import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Button from "./Button";
import ChooseExercises from "./ChooseExercises";
import { useErrorMessageStore } from "./store/errorMessageStore";

const createWorkout = async (workoutName: string) => {
    const result = await fetch('http://localhost:8000/workout', {
        method: 'Post',
        headers: {
            'Content-type': 'Application/json',
        },
        body: JSON.stringify({ workoutName }),
    });

    if (result.ok) {
        return await result.json();
    }
};

const CreateWorkout = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [error, setError] = useErrorMessageStore();
    const router = useRouter();

    const onStartWorkout = async (e: FormEvent) => {
        e.preventDefault();
        if (!workoutName) {
            return setError('Please Enter the workout name first');
        }
        console.log({ workoutName });
        const res = await createWorkout(workoutName);
        console.log({ res });
        setError('');
        if (res?.workout) {
            router.push(`/workout/${res.workout.id}`);
        }
    };
    return <div>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="relative bg-slate-200 p-5 rounded-md max-w-lg">
                        <Dialog.Title>Create Workout</Dialog.Title>
                        <Dialog.Description>Please start adding exercises and more</Dialog.Description>
                        <form onSubmit={onStartWorkout}>
                            <input
                                className="mb-4 p-2 w-full rounded"
                                type="text"
                                placeholder="Workout Name"
                                value={workoutName}
                                onChange={(e) => setWorkoutName(e.currentTarget.value)}
                            />
                            <ChooseExercises />
                            <div>
                                <Button type="submit">Create Workout</Button>
                            </div>
                        </form>
                        <div>{error && <div>{error}</div>}</div>
                    </div>
                </div>
    </div>;
};

export default CreateWorkout;

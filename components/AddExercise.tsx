import { FormEvent, useState } from "react";
import {useRouter} from 'next/router';
import Button from './Button';
import { config } from "../config/config";

interface PostExercise{
    name: string,
    workoutId: string
}

const postExercise = async ({name, workoutId}: PostExercise) => {
    try {
        const result = await fetch(`${config.apiUrl}/exercise`, {
            method: 'Post',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({ name, workoutId }),
        });
        if (result.ok) {
            return await result.json();
        }
    } catch (err) {
        console.error({ err });
    }
};

interface AddExerciseProps{
    id: string
}

const AddExercise = ({id}: AddExerciseProps) => {
    const [exerciseName, setExerciseName] = useState('');

    const router = useRouter();

    const onAddExercise = (e: FormEvent) => {
        e.preventDefault();
        postExercise({ name: exerciseName, workoutId: id })
            .then((res) => {
                console.log({ res });
                router.replace(router.asPath);
            })
            .catch((e) => console.error(e));
    };

    return (
        <div>
            <form onSubmit={onAddExercise}>
                <input
                    type="text"
                    placeholder="Exercise Name"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.currentTarget.value)}
                />
                <Button type="submit">Add Exercise</Button>
            </form>
        </div>
    );
};

export default AddExercise;
import produce from "immer";
import { useAtomValue, useSetAtom } from "jotai";
import { FormEvent } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import Button from "./Button";
import useCreateSet from "./hooks/useCreateSet";
import {v4 as uuid} from 'uuid';
import { getWorkoutAtom, setWorkoutAtom } from "./store/atoms";

const AddSetButtonTemplate = ({ exerciseId }: { exerciseId: string }) => {
    const workout = useAtomValue(getWorkoutAtom);
    const setWorkout = useSetAtom(setWorkoutAtom);

    const onAddSet = (e: FormEvent) => {
        e.preventDefault();
        //Todo: Add set to workout atom
        const newWorkout = produce(workout, draft => {
            draft.exercises.forEach(exercise => {
                if (exercise.id === exerciseId) {
                    exercise.sets = exercise.sets || [];
                    exercise.sets.push({
                        id: uuid(),
                        reps: "",
                        weight: ""
                    });
                }
            });
        });

        setWorkout({ workout: newWorkout });
    };

    return (
        <form onSubmit={onAddSet}>
            <div className="w-full">
            <button
                className="absolute bottom-2 right-2 bg-rose-200/70 text-rose-600 py-1 px-2 text-sm font-bold rounded-md"
                type="submit"
            >
                <div className="flex items-center gap-1">
                    <span className="inline-block">Add Set</span>
                    <span className="inline-block">
                        <IoMdAdd size={20} strokeWidth={20} />
                    </span>
                </div>
            </button>
            </div>
        </form>
    );
};

export default AddSetButtonTemplate;
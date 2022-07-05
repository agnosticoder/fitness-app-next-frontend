import produce from "immer";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import useUpdateWorkout from "./hooks/useUpdateWorkout";
import { getWorkoutAtom, setWorkoutAtom } from "./store/atoms";

const TemplateInputName = ({workoutName}: {workoutName: string}) => {
    const [workoutNameValue, setWorkoutNameValue] = useState(workoutName || '');
    const {debouncedValue} = useDebounce(workoutNameValue);
    const prevWorkoutName = useRef(workoutName);
    const workout = useAtomValue(getWorkoutAtom)
    const setWorkout = useSetAtom(setWorkoutAtom);

    useEffect(() => {
        if (debouncedValue !== prevWorkoutName.current) {
            prevWorkoutName.current = debouncedValue;

            const newWorkout = produce(workout, draft => {
                draft.name = debouncedValue;
            })

            setWorkout({workout: newWorkout});
        }
    }, [debouncedValue, setWorkout, workout]);

    return (
        <div className="text-center text-xl font-bold mx-10 border-[1px] border-zinc-700/40">
            <input className='w-full text-zinc-300 font-bold bg-zinc-800  outline-none focus:outline-none text-center rounded-md focus:ring-0 border-none' type="text" value={workoutNameValue} onChange={(e) => setWorkoutNameValue(e.currentTarget.value)} />
        </div>
    );
};

export default TemplateInputName;
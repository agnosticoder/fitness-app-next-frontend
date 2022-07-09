import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import { dispatchWorkoutAtom } from "./store/atoms";

const TemplateInputName = ({workoutName}: {workoutName: string}) => {
    const [workoutNameValue, setWorkoutNameValue] = useState(workoutName || '');
    const {debouncedValue} = useDebounce(workoutNameValue);
    const prevWorkoutName = useRef(workoutName);
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    useEffect(() => {
        if (debouncedValue !== prevWorkoutName.current) {
            prevWorkoutName.current = debouncedValue;
            dispatchWorkout({type: 'SET_TEMPLATE_NAME', name: debouncedValue});
        }
    }, [debouncedValue, dispatchWorkout]);

    return (
        <div className="text-center text-xl font-bold mx-10 border-[1px] border-zinc-700/40">
            <input className='w-full text-zinc-300 font-bold bg-zinc-800  outline-none focus:outline-none text-center rounded-md focus:ring-0 border-none' type="text" value={workoutNameValue} onChange={(e) => setWorkoutNameValue(e.currentTarget.value)} />
        </div>
    );
};

export default TemplateInputName;
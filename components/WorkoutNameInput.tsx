import { useEffect, useRef, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import useUpdateWorkout from "./hooks/useUpdateWorkout";

const WorkoutInputName = ({workoutName, workoutId}: {workoutName: string; workoutId: string}) => {
    const [workoutNameValue, setWorkoutNameValue] = useState(workoutName || '');
    const {debouncedValue} = useDebounce(workoutNameValue);
    const {mutate} = useUpdateWorkout();
    const prevWorkoutName = useRef(workoutName);

    useEffect(() => {
        console.log('Update workout Name', workoutId, debouncedValue);
        if (debouncedValue !== prevWorkoutName.current) {
            prevWorkoutName.current = debouncedValue;
            mutate({id: workoutId, name: debouncedValue});
        }
    }, [debouncedValue, mutate, workoutId]);

    return (
        <div className="text-center text-xl font-bold mx-10">
            <input className='w-full bg-zinc-800 outline-none focus:outline-zinc-700/80 text-center rounded-md' type="text" value={workoutNameValue} onChange={(e) => setWorkoutNameValue(e.currentTarget.value)} />
        </div>
    );
};

export default WorkoutInputName;
import { useSetAtom } from 'jotai';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import { dispatchWorkoutAtom, SetLocal } from './store/atoms';

const RepsInputTemplate = ({id, reps, exerciseId}:SetLocal & {exerciseId: string}) => {
    const [repsValue, setRepsValue] = useState(reps || '');
    const {debouncedValue} = useDebounce(repsValue);
    const prevReps = useRef(reps);

    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    const onChangeRepsInput = (e: ChangeEvent<HTMLInputElement>) => {
        // allow floating point numbers upto two decimal places using regex
        const value = e.currentTarget.value;
        const regex = /^\d*(\.\d{0,2})?$/;
        if(!regex.test(value)) return
        setRepsValue(value);
    }

    useEffect(() => {
        if (debouncedValue !== prevReps.current) {
            prevReps.current = debouncedValue;
            dispatchWorkout({type: 'SET_REPS_INPUT', exerciseId, setId: id, reps: debouncedValue});
        }
    }, [debouncedValue, dispatchWorkout, exerciseId, id]);

    return (
        <input 
        className='w-full p-0 bg-rose-100/40 rounded text-black text-center font-extrabold italic standalone:focus:ring-0 standalone:focus:border-none'
        type="text" pattern='[0-9]*' inputMode='decimal' value={repsValue} onChange={onChangeRepsInput} />
    );
};

export default RepsInputTemplate;
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import { Set } from './hooks/useGetWorkout';
import useUpdateSet from './hooks/useUpdateSet';

const RepsInput = ({id, reps}:Set) => {
    const [repsValue, setRepsValue] = useState(reps || '');
    const {debouncedValue} = useDebounce(repsValue);
    const {mutate} = useUpdateSet();
    const prevReps = useRef(reps);

    const onChangeRepsInput = (e: ChangeEvent<HTMLInputElement>) => {
        // allow floating point numbers upto two decimal places using regex
        const value = e.currentTarget.value;
        const regex = /^\d*(\.\d{0,2})?$/;
        if(!regex.test(value)) return
        setRepsValue(value);
    }

    useEffect(() => {
        console.log('Update reps', id, debouncedValue);
        if (debouncedValue !== prevReps.current) {
            prevReps.current = debouncedValue;
            mutate({ setId: id, reps: debouncedValue });
        }
    }, [debouncedValue]);

    return (
        <input className='w-full' type="text" value={repsValue} onChange={onChangeRepsInput} />
    );
};

export default RepsInput;
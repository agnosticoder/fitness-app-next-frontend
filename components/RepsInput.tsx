import { ChangeEvent, useRef, useState } from 'react';
import { Set } from '../lib/interfaces/Set';
import useUpdateSet from './hooks/useUpdateSet';

const RepsInput = ({id, reps}:Set) => {
    const [repsValue, setRepsValue] = useState(() => reps === null ? '' : reps);
    const {mutate} = useUpdateSet();
    const prevReps = useRef(reps);

    const onChangeRepsInput = (e: ChangeEvent<HTMLInputElement>) => {
        // allow floating point numbers upto two decimal places using regex
        const value = e.currentTarget.value;
        const regex = /^\d*(\.\d{0,2})?$/;
        if(!regex.test(value)) return
        setRepsValue(value);
    }

    const onUpdateReps = () => {
        console.log('Update reps', id, reps);
        console.log('Previous reps', prevReps.current);
        if (repsValue !== prevReps.current) {
            prevReps.current = repsValue;
            mutate({ setId: id, reps: repsValue });
        }
    }

    return (
        <input onBlur={onUpdateReps} className='w-full' type="text" value={repsValue} onChange={onChangeRepsInput} />
    );
};

export default RepsInput;
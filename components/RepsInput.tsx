import { ChangeEvent, useRef, useState } from 'react';
import { Set } from '../lib/interfaces/Set';
import useUpdateSet from './hooks/useUpdateSet';

const RepsInput = ({id, reps}:Set) => {
    const [repsValue, setRepsValue] = useState(reps || '');

    const onChangeRepsInput = (e: ChangeEvent<HTMLInputElement>) => {
        // allow floating point numbers upto two decimal places using regex
        const value = e.currentTarget.value;
        const regex = /^\d*(\.\d{0,2})?$/;
        if(!regex.test(value)) return
        setRepsValue(value);
    }

    return (
        <input className='w-full' type="text" value={repsValue} onChange={onChangeRepsInput} />
    );
};

export default RepsInput;
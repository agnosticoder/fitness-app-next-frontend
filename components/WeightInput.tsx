import { ChangeEvent, useRef, useState } from 'react';
import { Set } from '../lib/interfaces/Set';
import useErrorMessage from './hooks/useErrorMessage';
import useUpdateSet from './hooks/useUpdateSet';

const WeightInput = ({id, weight}:Set) => {
    const [weightValue, setWeightValue] = useState(() => weight === null ? '' : weight);
    const {mutate} = useUpdateSet();
    const preWeight = useRef(weight);

    const onChangeWeightInput = (e: ChangeEvent<HTMLInputElement>) => {
        // allow floating point numbers upto two decimal places using regex
        const value = e.currentTarget.value;
        const regex = /^\d*(\.\d{0,2})?$/;
        if(!regex.test(value)) return
        setWeightValue(value);
    }

    const onUpdateWeight = () => {
        console.log('Update weight', id, weightValue);
        if (weightValue !== preWeight.current) {
            preWeight.current = weightValue;
            mutate({ setId: id, weight: weightValue });
        }
    }

    return (
        <input onBlur={onUpdateWeight} className='w-full' type="text" value={weightValue} onChange={onChangeWeightInput} />
    );
};

export default WeightInput;
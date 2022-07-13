import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import { Set } from './hooks/useGetWorkout';
import useUpdateSet from './hooks/useUpdateSet';

const WeightInput = ({id, weight}:Set) => {
    const [weightValue, setWeightValue] = useState(weight || '');
    const {debouncedValue} = useDebounce(weightValue);
    const {mutate} = useUpdateSet();
    const preWeight = useRef(weight);

    const onChangeWeightInput = (e: ChangeEvent<HTMLInputElement>) => {
        // allow floating point numbers upto two decimal places using regex
        const value = e.currentTarget.value;
        const regex = /^\d*(\.\d{0,2})?$/;
        if(!regex.test(value)) return
        setWeightValue(value);
    }

    useEffect(() => {
        console.log('Update weight', id, debouncedValue);
        if (debouncedValue !== preWeight.current) {
            preWeight.current = debouncedValue;
            mutate({ setId: id, weight: debouncedValue });
        }
    }, [debouncedValue]);

    return (
        <input
        className='w-full p-0 bg-rose-100/40 rounded text-black text-center font-extrabold italic standalone:focus:ring-0 standalone:focus:border-none'
         type="text" pattern='[0-9]*' inputMode='decimal' value={weightValue} onChange={onChangeWeightInput} />
    );
};

export default WeightInput;
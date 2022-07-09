import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import { dispatchWorkoutAtom, SetLocal} from './store/atoms';
import { useSetAtom } from 'jotai';

const WeightInputTemplate = ({id, weight, exerciseId}:SetLocal & {exerciseId: string}) => {
    const [weightValue, setWeightValue] = useState(weight || '');
    const {debouncedValue} = useDebounce(weightValue);
    const preWeight = useRef(weight);

    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    const onChangeWeightInput = (e: ChangeEvent<HTMLInputElement>) => {
        // allow floating point numbers upto two decimal places using regex
        const value = e.currentTarget.value;
        const regex = /^\d*(\.\d{0,2})?$/;
        if(!regex.test(value)) return
        setWeightValue(value);
    }

    useEffect(() => {
        if (debouncedValue !== preWeight.current) {
            preWeight.current = debouncedValue;
            dispatchWorkout({type: 'SET_WEIGHT_INPUT', exerciseId, setId: id, weight: debouncedValue});
        }
    }, [debouncedValue, dispatchWorkout, exerciseId, id]);

    return (
        <input
        className='w-full p-0 bg-rose-100/40 rounded text-black text-center font-extrabold italic standalone:focus:ring-0 standalone:focus:border-none'
         type="text" pattern='[0-9]*' inputMode='decimal' value={weightValue} onChange={onChangeWeightInput} />
    );
};

export default WeightInputTemplate;
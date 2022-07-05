import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import useErrorMessage from './hooks/useErrorMessage';
import { Set } from './hooks/useGetWorkout';
import useUpdateSet from './hooks/useUpdateSet';
import { getWorkoutAtom, SetLocal, setWorkoutAtom } from './store/atoms';
import produce from 'immer';
import { useAtomValue, useSetAtom } from 'jotai';

const WeightInputTemplate = ({id, weight, exerciseId}:SetLocal & {exerciseId: string}) => {
    const [weightValue, setWeightValue] = useState(weight || '');
    const {debouncedValue} = useDebounce(weightValue);
    const preWeight = useRef(weight);

    const workout = useAtomValue(getWorkoutAtom);
    const setWorkout = useSetAtom(setWorkoutAtom);

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

            //update the workout atom
            const newWorkout = produce(workout, draft => {
                draft.exercises.forEach(exercise => {
                    if(exercise.id === exerciseId){
                        exercise.sets?.forEach(set => {
                            if(set.id === id){
                                set.weight = debouncedValue;
                            }
                        }
                        )
                    }
                });
            });
            setWorkout({workout: newWorkout});
        }
    }, [debouncedValue, exerciseId, id, setWorkout, workout]);

    return (
        <input
        className='w-full p-0 bg-rose-100/40 rounded text-black text-center font-extrabold italic standalone:focus:ring-0 standalone:focus:border-none'
         type="text" pattern='[0-9]*' inputMode='decimal' value={weightValue} onChange={onChangeWeightInput} />
    );
};

export default WeightInputTemplate;
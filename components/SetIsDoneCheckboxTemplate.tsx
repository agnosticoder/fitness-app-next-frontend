import { useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import useErrorMessage from './hooks/useErrorMessage';
import { Set } from './hooks/useGetWorkout';
import useUpdateSet from './hooks/useUpdateSet';
import { dispatchWorkoutAtom, SetLocal, setNotificatonAtom } from './store/atoms';

const SetIsDoneCheckboxTemplate = ({ id, isDone, weight, reps, exerciseId }: SetLocal & {exerciseId: string}) => {
    // const [isDoneValue, setIsDoneValue] = useState(isDone);
    // // const { mutate } = useUpdateSet();
    // const prevIsDone = useRef(isDone);
    // const { handleError } = useErrorMessage();
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);
    const setNotification = useSetAtom(setNotificatonAtom);

    const onHandleChange = () => {
        console.log('isDoneValue', isDone);
        if(isDone){
            // return setIsDoneValue(false);
            return dispatchWorkout({type: 'TOGGLE_SET_DONE', exerciseId, setId: id});
        }
        // if weight or reps are falsy, send message saying reps and weight are required
        if (!weight || !reps) {
            // handleError('reps and weight are required');
            setNotification({message: 'reps and weight are required', mode: 'info'});
            return;
        }

        // reps cannot be 0 but weight can be
        if(reps === '0'){
            // handleError('reps cannot be 0');
            setNotification({message: 'reps cannot be 0', mode: 'info'});
            return;
        }

        dispatchWorkout({type: 'TOGGLE_SET_DONE', exerciseId, setId: id});
    };

    // useEffect(() => {
    //     if (isDoneValue !== prevIsDone.current) {
    //         prevIsDone.current = isDoneValue;
    //         // mutate({ setId: id, isDone: isDoneValue });
    //     }
    // }, [id, isDoneValue]);

    return  <input className='rounded w-6 h-6 bg-rose-300 text-rose-600 cursor-pointer' type="checkbox" checked={isDone} onChange={onHandleChange} />
}

export default SetIsDoneCheckboxTemplate;
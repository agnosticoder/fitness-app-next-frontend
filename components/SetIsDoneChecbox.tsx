import { useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Set } from './hooks/useGetWorkout';
import useUpdateSet from './hooks/useUpdateSet';
import { setNotificationAtom } from './store/atoms';

const SetIsDoneCheckbox = ({ id, isDone, weight, reps }: Set) => {
    const [isDoneValue, setIsDoneValue] = useState(isDone);
    const { mutate } = useUpdateSet();
    const prevIsDone = useRef(isDone);
    const setNotification = useSetAtom(setNotificationAtom);

    const onHandleChange = () => {
        if(isDoneValue){
            return setIsDoneValue(false);
        }
        // if weight or reps are falsy, send message saying reps and weight are required
        if (!weight || !reps) {
            setNotification({message: 'reps and weight are required', mode: 'info'});
            return;
        }

        // reps cannot be 0 but weight can be
        if(reps === '0'){
            setNotification({message: 'reps cannot be 0', mode: 'info'});
            return;
        }

        setIsDoneValue(!isDoneValue);
    };

    useEffect(() => {
        if (isDoneValue !== prevIsDone.current) {
            prevIsDone.current = isDoneValue;
            mutate({ setId: id, isDone: isDoneValue });
        }
    }, [id, isDoneValue, mutate]);

    return  <input className='rounded w-6 h-6 bg-rose-300 text-rose-600 cursor-pointer' type="checkbox" checked={isDoneValue} onChange={onHandleChange} />
}

export default SetIsDoneCheckbox;
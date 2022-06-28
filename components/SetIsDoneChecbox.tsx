import { useEffect, useRef, useState } from 'react';
import useErrorMessage from './hooks/useErrorMessage';
import { Set } from './hooks/useGetWorkout';
import useUpdateSet from './hooks/useUpdateSet';

const SetIsDoneCheckbox = ({ id, isDone, weight, reps }: Set) => {
    const [isDoneValue, setIsDoneValue] = useState(isDone);
    const { mutate } = useUpdateSet();
    const prevIsDone = useRef(isDone);
    const { handleError } = useErrorMessage();

    const onHandleChange = () => {
        if(isDoneValue){
            return setIsDoneValue(false);
        }
        // if weight or reps are falsy, send message saying reps and weight are required
        if (!weight || !reps) {
            handleError('reps and weight are required');
            return;
        }

        // reps cannot be 0 but weight can be
        if(reps === '0'){
            handleError('reps cannot be 0');
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

    return  <input className='w-full' type="checkbox" checked={isDoneValue} onChange={onHandleChange} />
}

export default SetIsDoneCheckbox;
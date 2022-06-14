import { FormEvent } from 'react';
import { Exercise } from '../lib/interfaces/Exercise';
import Button from './Button';
import useCreateSet from './hooks/useCreateSet';
import Set from './Set';

const Exercise = ({id, name, workoutId, sets}: Exercise) => {

    const { mutate, data } = useCreateSet();

    console.log('Exercise', data);

    const onAddSet = (e:FormEvent) => {
        e.preventDefault();

        mutate({exerciseId: id });
        console.log({id, name, workoutId, sets});
    }

    return (
        <div>
            <ul className="bg-slate-400 rounded-lg p-2">
                <div className='text-center bg-violet-500 text-violet-200 rounded'>{name}</div>
                <table className='w-full table-auto'>
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sets?.map((set, index) => <Set key={set.id} {...set} index={index}/>)}
                    </tbody>
                </table>
                <form onSubmit={onAddSet}>
                    <div className='w-full'>
                        <Button className='block w-full' type='submit'>Add Set</Button>
                    </div>
                </form>
            </ul>
        </div>
    );
}

export default Exercise;
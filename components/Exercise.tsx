import { FormEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Exercise } from '../lib/interfaces/Exercise';
import AddSetForm from './AddSetForm';
import Button from './Button';
import useCreateSet from './hooks/useCreateSet';
import Set from './Set';


const Exercise = ({ id, name, workoutId, sets }: Exercise) => {

    return (
        <div>
            <ul className="bg-slate-400 rounded-lg p-2">
                <div className="text-center bg-violet-500 text-violet-200 rounded">{name}</div>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sets?.map((set, index) => (
                            <Set key={set.id} {...set} index={index} />
                        ))}
                    </tbody>
                </table>
                <AddSetForm exerciseId={id}/>
            </ul>
        </div>
    );
};

export default Exercise;
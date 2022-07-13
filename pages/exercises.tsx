import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import exercisesJson from '../db/exercises.json';

const Exercises = () => {
    const [value, setValue] = useState('');
    const exercises = matchSorter(exercisesJson.exercises, value, { keys: ['name'] });

    return (
        <div>
            <div className='fixed top-14 standalone:top-[88px] left-0 right-0 p-4 bg-zinc-800'>
                <input className="w-full p-2 rounded bg-zinc-700" placeholder="Search Exercise" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
            </div>
            <div className="divide-y divide-zinc-600/50 overflow-auto mt-20 h-[calc(100vh-176px)] standalone:h-[calc(100vh-264px)]">
                {exercises.map((exercise) => (
                    <div key={exercise.name} className="h-20">
                        <h3 className="text-center">{exercise.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Exercises;
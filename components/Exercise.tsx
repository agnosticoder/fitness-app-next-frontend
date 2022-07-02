import AddSetButton from './AddSetButton';
import DeleteExerciseButton from './DeleteExerciseButton';
import useGetLatestExercise from './hooks/useGetLatestExercise';
import { Exercise } from './hooks/useGetWorkout';
import DeleteExercise from './modals/DeleteExercise';
import Set from './Set';


const Exercise = ({ id, name, workoutId, sets }: Exercise) => {
    const {data: exercise} = useGetLatestExercise({name});

    console.log('exercise', exercise);

    return (
        <div>
            <ul className="relative bg-rose-900 text-zinc-300 rounded-lg p-2 drop-shadow-md pb-14">
                <div className="font-bold text-2xl tracking-wider mb-4 text-white">{name}</div>
                <table className="w-full table-auto">
                    <thead>
                        <tr className=''>
                            <th className='font-normal'>Set</th>
                            <th className='font-normal'>Weight</th>
                            <th className='font-normal'>Reps</th>
                            <th className='font-normal'>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sets?.map((set, index) => (
                            <Set key={set.id} {...set} index={index} />
                        ))}
                    </tbody>
                </table>
                <AddSetButton exerciseId={id}/>
                <DeleteExerciseButton exerciseId={id}/>
            </ul>
        </div>
    );
};

export default Exercise;
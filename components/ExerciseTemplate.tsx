import AddSetButtonTemplate from './AddSetButtonTemplate';
import DeleteExerciseButton from './DeleteExerciseButton';
import SetTempalate from './SetTemplate';
import { ExerciseLocal } from './store/atoms';


const ExerciseTemplate = ({ id, name, sets, isHistory }: ExerciseLocal & { isHistory?: boolean}) => {
    return (
        <div>
            <ul className="relative bg-rose-900 text-zinc-300 rounded-lg p-2 drop-shadow-md pb-14">
                <div className="font-bold text-2xl tracking-wider mb-4 text-white">{name}</div>
                <table className="w-full table-auto">
                    {sets && sets?.length > 0 && (
                        <thead>
                            <tr className="">
                                <th className="font-normal">Set</th>
                                <th className="font-normal">Weight</th>
                                <th className="font-normal">Reps</th>
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {sets?.map((set, index) => (
                            <SetTempalate key={set.id} {...set} index={index} exerciseId={id} isHistory= {isHistory}/>
                        ))}
                    </tbody>
                </table>
                <AddSetButtonTemplate exerciseId={id} />
                <DeleteExerciseButton exerciseId={id} isTemplate />
            </ul>
        </div>
    );
};

export default ExerciseTemplate;
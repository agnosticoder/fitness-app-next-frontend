import useDeleteSet from './hooks/useDeleteSet';
import { AiFillDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Set } from './hooks/useGetWorkout';
import {RiDeleteBin5Line} from 'react-icons/ri';
import { getWorkoutAtom, SetLocal, setWorkoutAtom } from './store/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import produce from 'immer';

const DeleteSetTemplate = ({id, exerciseId}:SetLocal & {exerciseId: string}) => {
    const workout = useAtomValue(getWorkoutAtom);
    const setWorkout = useSetAtom(setWorkoutAtom);

    const onDeleteSet = () => {
        console.log('Delete set', id);
        const newWorkout = produce(workout, draft => {
            draft.exercises.forEach(exercise => {
                if(exercise.id === exerciseId){
                    exercise.sets = exercise.sets?.filter(set => set.id !== id);
                }
            });
        });

        setWorkout({workout: newWorkout});
    };

    return (
        <div>
            <button
                className="bg-rose-200/70 text-red-900 py-1 px-2 text-sm font-bold rounded-md"
                onClick={onDeleteSet}
            >
                <div className="flex items-center gap-1">
                    <span className="inline-block">
                        <RiDeleteBin5Line size={20}/>
                    </span>
                </div>
            </button>
        </div>

    )
};

export default DeleteSetTemplate;
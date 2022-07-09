import useDeleteSet from './hooks/useDeleteSet';
import { AiFillDelete } from 'react-icons/ai';
import {RiDeleteBin5Line} from 'react-icons/ri';
import { dispatchWorkoutAtom, SetLocal } from './store/atoms';
import { useSetAtom } from 'jotai';

const DeleteSetTemplate = ({id, exerciseId}:SetLocal & {exerciseId: string}) => {
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    const onDeleteSet = () => {
        dispatchWorkout({type: 'REMOVE_SET', exerciseId, setId: id});
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
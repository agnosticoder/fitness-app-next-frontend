import useDeleteSet from './hooks/useDeleteSet';
import { AiFillDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Set } from './hooks/useGetWorkout';
import {RiDeleteBin5Line} from 'react-icons/ri';

const DeleteSet = ({id}:Set) => {
    const router = useRouter();
    const {id: workoutId} = router.query as {id: string};
    const {mutate, data} = useDeleteSet(workoutId);

    const onDeleteSet = () => {
        console.log('Delete set', id);
        mutate({setId: id});
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

export default DeleteSet;
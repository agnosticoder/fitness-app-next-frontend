import useDeleteSet from './hooks/useDeleteSet';
import { AiFillDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Set } from './hooks/useGetWorkout';

const DeleteSet = ({id}:Set) => {
    const router = useRouter();
    const {id: workoutId} = router.query as {id: string};
    const {mutate, data} = useDeleteSet(workoutId);

    const onDeleteSet = () => {
        console.log('Delete set', id);
        mutate({setId: id});
    };

    return <button onClick={onDeleteSet} className='text-red-600'><AiFillDelete /></button>
};

export default DeleteSet;
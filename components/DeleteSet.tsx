import { Set } from '../lib/interfaces/Set';
import useDeleteSet from './hooks/useDeleteSet';
import { AiFillDelete } from 'react-icons/ai';

const DeleteSet = ({id}:Set) => {
    const {mutate, data} = useDeleteSet();

    const onDeleteSet = () => {
        console.log('Delete set', id);
        mutate({setId: id});
    };

    return <button onClick={onDeleteSet} className='text-red-600'><AiFillDelete /></button>
};

export default DeleteSet;
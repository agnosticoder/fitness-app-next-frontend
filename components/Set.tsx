import WeightInput from './WeightInput';
import RepsInput from './RepsInput';
import DeleteSet from './DeleteSet';
import SetIsDoneCheckbox from './SetIsDoneChecbox';
import useGetWorkout, { Set } from './hooks/useGetWorkout';
import { useRouter } from 'next/router';

interface SetProps extends Set {
    index: number;
}

const Set = (set:SetProps) => {
    const router = useRouter();
    const { id } = router.query as {id: string};
    const {data: workout} = useGetWorkout({id});

    const isTemplate = workout?.isTemplate;

    return (
        <tr>
            <td className='text-center'>
                {set.index + 1}
            </td>

            <td>
                <WeightInput {...set}/>
            </td>

            <td>
                <RepsInput {...set}/>
            </td>

            {!isTemplate && <td className='text-center'>
                <SetIsDoneCheckbox {...set}/>
            </td>}

            <td>
                <DeleteSet {...set}/>
            </td>
        </tr>
    );
};

export default Set;
import { Set } from '../lib/interfaces/Set';
import WeightInput from './WeightInput';
import RepsInput from './RepsInput';
import DeleteSet from './DeleteSet';
import SetIsDoneCheckbox from './SetIsDoneChecbox';

interface SetProps extends Set {
    index: number;
}

const Set = (set:SetProps) => {
    return (
        <tr>
            <td>
                {set.index + 1}
            </td>

            <td>
                <WeightInput {...set}/>
            </td>

            <td>
                <RepsInput {...set}/>
            </td>

            <td>
                <SetIsDoneCheckbox {...set}/>
            </td>
            <td>
                <DeleteSet {...set}/>
            </td>
        </tr>
    );
};

export default Set;
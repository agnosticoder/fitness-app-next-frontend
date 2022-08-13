import WeightInput from './WeightInput';
import RepsInput from './RepsInput';
import DeleteSet from './DeleteSet';
import SetIsDoneCheckbox from './SetIsDoneChecbox';
import useGetWorkout from './hooks/useGetWorkout';
import { useRouter } from 'next/router';
import { ExerciseLocal, SetLocal } from './store/atoms';
import WeightInputTemplate from './WeightInputTemplate';
import RepsInputTemplate from './RepsInputTemplate';
import DeleteSetTemplate from './DeleteSetTemplate';
import SetIsDoneCheckboxTemplate from './SetIsDoneCheckboxTemplate';

interface SetProps extends SetLocal {
    index: number;
}

const SetTemplate = ({isHistory, ...set}:SetProps & {exerciseId: string, isHistory?: boolean}) => {
    const router = useRouter();
    console.log({isHistory})

    return (
        <tr>
            <td className="text-center">{set.index + 1}</td>

            <td>
                <WeightInputTemplate {...set} />
            </td>

            <td>
                <RepsInputTemplate {...set} />
            </td>

            {isHistory && (
                <td>
                    <SetIsDoneCheckboxTemplate {...set} />
                </td>
            )}

            <td>
                <DeleteSetTemplate {...set} />
            </td>
        </tr>
    );
};

export default SetTemplate;
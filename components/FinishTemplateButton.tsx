import produce from "immer";
import { useAtomValue } from "jotai";
import Button from "./Button";
import useCreateTemplate from "./hooks/useCreateTemplate";
import useErrorMessage from "./hooks/useErrorMessage";
import useFinishWorkout from "./hooks/useFinishWorkout";
import { Exercise, Workout } from "./hooks/useGetWorkout";
import { getWorkoutAtom } from "./store/atoms";

const FinishTemplateButton = () => {
    const { handleError } = useErrorMessage();
    const {exercises, name} = useAtomValue(getWorkoutAtom);
    const {mutate} = useCreateTemplate();
    

    const onFinishTemplate = () => {
        if (exercises?.length === 0) {
            handleError('Please add at least one exercise');
            return;
        }
        mutate({name, exercises});
    };
    return (
            <button disabled={!exercises.length} className="bg-green-500 text-zinc-100 font-bold py-1 px-2 rounded-md disabled:bg-green-500/50 disabled:text-zinc-100/50" onClick={onFinishTemplate}>Create Template</button>
    );
};

export default FinishTemplateButton;

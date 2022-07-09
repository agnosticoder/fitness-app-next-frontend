import { useAtomValue, useSetAtom } from "jotai";
import useCreateTemplate from "./hooks/useCreateTemplate";
import useErrorMessage from "./hooks/useErrorMessage";
import useSaveTemplate from "./hooks/useSaveTemplate";
import { dispatchWorkoutAtom, getWorkoutAtom} from "./store/atoms";

const FinishTemplateButton = ({ isEdit }: { isEdit: boolean }) => {
    const { handleError } = useErrorMessage();
    const { exercises, name,  id} = useAtomValue(getWorkoutAtom);
    const { mutate:createTemplate } = useCreateTemplate();
    const { mutate:updateTemplate} = useSaveTemplate();
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    const onFinishTemplate = () => {
        if (exercises?.length === 0) {
            handleError('Please add at least one exercise');
            return;
        }
        if (isEdit) {
            console.log('workoutatom emptied');
            updateTemplate({ id, name, exercises });
            dispatchWorkout({type: 'RESET_WORKOUT'});
        } else {
            console.log('workoutatom emptied');
            createTemplate({ name, exercises });
            dispatchWorkout({type: 'RESET_WORKOUT'});
        }
    };
    return (
        <button
            disabled={exercises && !exercises.length}
            className="bg-green-500 text-zinc-100 font-bold py-1 px-2 rounded-md disabled:bg-green-500/10 disabled:text-zinc-100/50"
            onClick={onFinishTemplate}
        >
            {isEdit ? "Update" : "Create Template"}
        </button>
    );
};

export default FinishTemplateButton;

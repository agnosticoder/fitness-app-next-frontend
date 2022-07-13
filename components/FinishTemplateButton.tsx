import { useAtomValue, useSetAtom } from "jotai";
import useCreateTemplate from "./hooks/useCreateTemplate";
import useSaveTemplate from "./hooks/useSaveTemplate";
import { dispatchWorkoutAtom, getWorkoutAtom, setNotificationAtom} from "./store/atoms";

const FinishTemplateButton = ({ isEdit }: { isEdit: boolean }) => {
    const { exercises, name,  id} = useAtomValue(getWorkoutAtom);
    const { mutate:createTemplate } = useCreateTemplate();
    const { mutate:updateTemplate} = useSaveTemplate();
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);
    const setNotification = useSetAtom(setNotificationAtom);

    const onFinishTemplate = () => {
        if (exercises?.length === 0) {
            // handleError('Please add at least one exercise');
            setNotification({message: 'Please add at least one exercise', mode: 'info'});   
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

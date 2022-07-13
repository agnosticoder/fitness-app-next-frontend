import produce from "immer";
import { useSetAtom } from 'jotai';
import Button from "./Button";
import { Exercise, Workout } from "./hooks/useGetWorkout";
import useSaveTemplate from "./hooks/useSaveTemplate";
import { setNotificationAtom } from './store/atoms';

const SaveTemplateButton = ({id, name, exercises}: Workout) => {
    const { mutate } = useSaveTemplate();
    const setNotification = useSetAtom(setNotificationAtom);

    const onSaveTemplate = () => {
        if (exercises?.length === 0) return setNotification({message: 'Please add at least one exercise', mode: 'info'});

        const exercisesWithSets = produce(exercises, (draft: Exercise[]) => {
            draft.forEach((exercise) => {
                exercise.sets = exercise.sets.map((set, index) => {
                    return {
                        ...set,
                        setOrder: String(index + 1),
                    };
                });
            });
        });

        mutate({ id, name, exercises: exercisesWithSets });
    };

    return (
        <div>
            <Button onClick={onSaveTemplate}>Save Template</Button>
        </div>
    );
};

export default SaveTemplateButton;
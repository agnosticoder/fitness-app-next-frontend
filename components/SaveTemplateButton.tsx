import produce from "immer";
import Button from "./Button";
import useErrorMessage from "./hooks/useErrorMessage";
import { Exercise, Workout } from "./hooks/useGetWorkout";
import useSaveTemplate from "./hooks/useSaveTemplate";

const SaveTemplateButton = ({id, name, exercises}: Workout) => {
    const { mutate } = useSaveTemplate();
    const { handleError } = useErrorMessage();

    const onSaveTemplate = () => {
        if (exercises?.length === 0) return handleError("Please add at least one exercise");

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
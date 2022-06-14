import { UseComboboxGetItemPropsOptions } from "downshift";
import { ExerciseProps } from "../pages/workout/[id]";

interface ExerciseListItemProps extends ExerciseProps {
    className: string;
    getItemProps: (options: UseComboboxGetItemPropsOptions<string>) => any;
}

const ExerciseListItem = ({className, getItemProps, id, name}: ExerciseListItemProps) => {
    return (
            <li className={className} {...getItemProps({item: name, id})}>
                {name}
            </li>
    );
};

export default ExerciseListItem;

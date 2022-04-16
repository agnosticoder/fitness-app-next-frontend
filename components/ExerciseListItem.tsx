import { Exercise } from "../pages/workout/[id]";

const ExerciseListItem = ({ id, name }: Exercise) => {
    return (
            <li className="list-none" key={id}>
                {name}
            </li>
    );
};

export default ExerciseListItem;

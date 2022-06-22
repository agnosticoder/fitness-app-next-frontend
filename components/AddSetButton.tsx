import { FormEvent } from "react";
import Button from "./Button";
import useCreateSet from "./hooks/useCreateSet";

const AddSetButton = ({exerciseId}: {exerciseId: string}) => {
    const { mutate, data } = useCreateSet();

    console.log('Exercise', data);

    const onAddSet = (e: FormEvent) => {
        e.preventDefault();

        mutate({ exerciseId});
    };

    return (
        <form onSubmit={onAddSet}>
            <div className="w-full">
                <Button className="block w-full" type="submit">
                    Add Set
                </Button>
            </div>
        </form>
    );
};

export default AddSetButton;
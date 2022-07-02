import { FormEvent } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import Button from "./Button";
import useCreateSet from "./hooks/useCreateSet";

const AddSetButton = ({ exerciseId }: { exerciseId: string }) => {
    const { mutate, data } = useCreateSet();

    const onAddSet = (e: FormEvent) => {
        e.preventDefault();

        mutate({ exerciseId });
    };

    return (
        <form onSubmit={onAddSet}>
            <div className="w-full">
            <button
                className="absolute bottom-2 right-2 bg-rose-200/70 text-rose-600 py-1 px-2 text-sm font-bold rounded-md"
                type="submit"
            >
                <div className="flex items-center gap-1">
                    <span className="inline-block">Add Set</span>
                    <span className="inline-block">
                        <IoMdAdd size={20} strokeWidth={20} />
                    </span>
                </div>
            </button>
            </div>
        </form>
    );
};

export default AddSetButton;
import { useSetAtom } from "jotai";
import { FormEvent } from "react";
import { IoMdAdd } from "react-icons/io";
import { dispatchWorkoutAtom } from "./store/atoms";

const AddSetButtonTemplate = ({ exerciseId }: { exerciseId: string }) => {
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    const onAddSet = (e: FormEvent) => {
        e.preventDefault();
        dispatchWorkout({ type: 'ADD_SET', exerciseId});
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

export default AddSetButtonTemplate;
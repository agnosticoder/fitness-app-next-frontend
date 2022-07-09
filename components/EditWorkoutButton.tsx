import { Menu } from "@headlessui/react";
import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";
import { dispatchWorkoutAtom } from "./store/atoms";

const EditWorkoutButton = ({workoutId, isTemplate}: {workoutId: string, isTemplate?: boolean}) => {
    const router = useRouter();
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    const onEdit = () => {
        if(isTemplate) {
            dispatchWorkout({type: 'RESET_WORKOUT'});
            router.push(`/template/edit/${workoutId}`);
        }
        else {
            router.push(`/history/edit/${workoutId}`);
        }
    }

    return (
        <Menu.Item>
            {({ active }: { active: boolean }) => (
                // Todo: Later I can change to prefetch using Link or react-query
                <button onClick={onEdit} className={`rounded text-left p-1`}>
                    <MdEdit className="inline-block mr-2" />
                    Edit
                </button>
            )}
        </Menu.Item>
    );
};

export default EditWorkoutButton;

import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";

const EditWorkoutButton = ({workoutId, isTemplate}: {workoutId: string, isTemplate?: boolean}) => {
    const router = useRouter();

    const onEdit = () => {
        if(isTemplate) {
            router.push(`/template/${workoutId}`);
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

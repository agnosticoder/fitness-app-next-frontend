import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { dispatchWorkoutAtom } from "./store/atoms";

const CancelTemplateButton = ({identifier}:{identifier: 'template' | 'history'}) => {
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);
    const router = useRouter();

    const onCancelTemplate = () => {
        dispatchWorkout({ type: 'RESET_WORKOUT' });
        if (identifier === 'template') {
            router.push('/');
        }
        if(identifier === 'history') {
            router.push('/history');
        }
    };

    return (
        <button className="bg-zinc-500 text-zinc-200 px-3 py-1 rounded drop-shadow-md" onClick={onCancelTemplate}>
            Cancel
        </button>
    );
};

export default CancelTemplateButton;

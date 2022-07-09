import { useRouter } from "next/router";
import {useModal} from "@ebay/nice-modal-react";
import AddExercises from "../../../components/modals/AddExercises";
import CancelWorkoutButton from "../../../components/CancelWorkoutButton";
import { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { dispatchWorkoutAtom, getWorkoutAtom } from "../../../components/store/atoms";
import FinishTemplateButton from "../../../components/FinishTemplateButton";
import TemplateInputName from "../../../components/TemplateInputName";
import ExerciseTemplate from "../../../components/ExerciseTemplate";
import useGetWorkoutOnce from "../../../components/hooks/useGetWorkoutOnce";
import CancelTemplateButton from "../../../components/CancelTemplateButton";

const EditTemplate = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const isFetchedRef = useRef(false);
    const { workout } = useGetWorkoutOnce({ id });

    const addExercisesModal = useModal(AddExercises);
    const workoutLocal = useAtomValue(getWorkoutAtom);
    const dispatchWorkout = useSetAtom(dispatchWorkoutAtom);

    useEffect(() => {
        if (workout) {
            dispatchWorkout({ type: 'SET_WORKOUT', workout });
            isFetchedRef.current = true;
        }
    }, [dispatchWorkout, workout]);

    return (
        <>
            <div>
                <div>
                    <div className="">
                        <div className="mb-4 flex justify-between">
                            <CancelTemplateButton />
                            <CancelWorkoutButton identifier="template" workoutId={workoutLocal.id}/>
                            <FinishTemplateButton isEdit />
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        {isFetchedRef.current && <TemplateInputName workoutName={workoutLocal.name} />}
                    </div>
                    <div className="mb-4">
                        {/*//Todo: Add functionality to create custom exercises */}
                        {/* <AddExercise id={id} /> */}
                        <div className="grid grid-col-1 sm:grid-cols-2 gap-3 sm:gap-2">
                            {workoutLocal?.exercises?.map((exercise: any) => (
                                <ExerciseTemplate key={exercise.id} {...exercise} />
                            ))}
                        </div>
                    </div>
                    <div className="text-center mb-32">
                        <button
                            className="bg-rose-200/70 text-rose-600 py-1 px-2 text-lg font-bold rounded-md w-52 drop-shadow-md border-[1px] border-rose-300/70"
                            onClick={() => addExercisesModal.show({ workoutId: workoutLocal?.id, isTemplate: true })}
                        >
                            Add Exercises
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTemplate;
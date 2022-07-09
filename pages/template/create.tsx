import CancelWorkoutButton from "../../components/CancelWorkoutButton";
import {useModal} from '@ebay/nice-modal-react';
import AddExercises from "../../components/modals/AddExercises";
import { useAtomValue } from "jotai";
import { getWorkoutAtom } from "../../components/store/atoms";
import ExerciseTemplate from "../../components/ExerciseTemplate";
import FinishTemplateButton from "../../components/FinishTemplateButton";
import TemplateInputName from "../../components/TemplateInputName";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CancelTemplateButton from "../../components/CancelTemplateButton";

const CreateTemplate = () => {
    const addExercisesModal = useModal(AddExercises);
    const workout = useAtomValue(getWorkoutAtom);
    const router = useRouter();
    

    //Todo:Confirm cancel the navigation and make the pathname the same as before
    // useEffect(() => {
    //     router.beforePopState(({ url, as, options }) => {
    //         console.log('router aspath', router.asPath);
    //         console.log('as', as);
    //         if (router.asPath !== as && workout.exercises.length > 0) {
    //             const isConfirmed = window.confirm(
    //                 'Are you sure you want to leave this page? Your changes will be lost.'
    //             );
    //             if (!isConfirmed) {
    //                 //Todo: cancel the navigation and make the pathname the same as before
    //                 console.log('as', as);
    //                 window.location.href = as;
    //                 console.log('cancelling');
    //                 return false;
    //             }
    //         }
    //         return true;
    //     });
    //     return () => {
    //         router.beforePopState(() => true);
    //     };
    // }, [router, workout.exercises.length]);

    // useEffect(() => {
    //     const isSure = (e:BeforeUnloadEvent) => {
    //         e.preventDefault();
    //         console.log('triggering beforeunload');
    //         if (workout.exercises.length > 0) {
    //             return 'Are you sure you want to leave? Your workout will be lost.';
    //         }
    //     };
    //     addEventListener('beforeunload', isSure);
    //     return () => {
    //         removeEventListener('beforeunload', isSure);
    //     };
    // }, [workout]);

    return (
        <div>
                <div>
                    <div className="">
                        <div className="mb-4 flex justify-between">
                            {/* <CancelWorkoutButton identifier="template" /> */}
                            <CancelTemplateButton />
                            <FinishTemplateButton isEdit={false}/>
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        <TemplateInputName workoutName={workout.name}/>
                    </div>
                    <div className='mb-4'>
                        {/*//Todo: Add functionality to create custom exercises */}
                        {/* <AddExercise id={id} /> */}
                        <div className="grid grid-col-1 sm:grid-cols-2 gap-3 sm:gap-2">
                            {workout.exercises?.map((exercise: any) => (
                                <ExerciseTemplate key={exercise.id} {...exercise} />
                            ))}
                        </div>
                    </div>
                    <div className="text-center mb-32">
                        <button
                            className="bg-rose-200/70 text-rose-600 py-1 px-2 text-lg font-bold rounded-md w-52 drop-shadow-md border-[1px] border-rose-300/70"
                            onClick={() => addExercisesModal.show({ workoutId: workout.id , isTemplate: true})}
                        >
                            Add Exercises
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default CreateTemplate;
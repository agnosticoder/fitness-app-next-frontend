import invariant from 'tiny-invariant';
import Button from './Button';
import useGetWorkouts from './hooks/useGetWorkouts';
import { useModal } from '@ebay/nice-modal-react';
import ConfirmStartNewTemplate from './modals/ConfrimStartNewTemplate';
import CreateTemplate from './modals/CreateTemplate';
import { GrFormAdd } from 'react-icons/gr';
import { IoMdAdd } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { setWorkoutAtom, WorkoutLocal } from './store/atoms';
import {v4 as uuid} from 'uuid';

const CreateTemplateButton = () => {
    const { data: workouts } = useGetWorkouts();
    const confirmStartNewTemplateModal = useModal('template/confirm-start-new-template');
    const createTemplateModal = useModal('template/create-template');
    const router = useRouter();
    const setWorkout = useSetAtom(setWorkoutAtom);

    const inProcessTemplates = workouts?.filter((workout) => !workout.isDone && workout.isTemplate);

    const onCreateTemplate = () => {
        invariant(inProcessTemplates, 'inProcessTemplates is undefined');
        const isTemplateInProcess = inProcessTemplates?.length > 0;
        if (isTemplateInProcess) {
            confirmStartNewTemplateModal.show();
            return;
        }

        createTemplateModal.show();
        // setIsOpen(true);
    };

    const onAddTemplate = () => {
        const workout: WorkoutLocal = {
            id: uuid(),
            name: 'New Template',
            exercises: []
        }
        setWorkout({workout});
        router.push('/template/create');
    };

    return (
        <div>
            <button
                className="inline-block bg-rose-200/70 text-rose-600 py-1 px-2 text-sm font-bold rounded-md border-[1px] border-rose-300/70"
                onClick={onAddTemplate}
            >
                <div className="flex items-center gap-1">
                    <span className="inline-block">Add Template</span>
                    <span className="inline-block">
                        <IoMdAdd size={20} strokeWidth={20} />
                    </span>
                </div>
            </button>
            {/* <button
                className="bg-rose-200/70 text-rose-600 py-1 px-2 text-sm font-bold rounded-md border-[1px] border-rose-300/70"
                onClick={onCreateTemplate}
            >
                <div className="flex items-center gap-1">
                    <span className="inline-block">Add Template</span>
                    <span className="inline-block">
                        <IoMdAdd size={20} strokeWidth={20} />
                    </span>
                </div>
            </button> */}
            <ConfirmStartNewTemplate id="template/confirm-start-new-template" />
            <CreateTemplate id="template/create-template" />
        </div>
    );
};

export default CreateTemplateButton;

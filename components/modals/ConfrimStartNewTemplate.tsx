import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import invariant from 'tiny-invariant';
import Button from '../Button';
import GenricDialog from '../GenricDialog';
import useDeleteTemplate from '../hooks/useDeleteTemplate';
import useGetWorkouts from '../hooks/useGetWorkouts';

const ConfirmStartNewTemplate = NiceModal.create(() => {
    const { visible, hide } = useModal();
    const { data: workouts } = useGetWorkouts();
    const { mutate } = useDeleteTemplate();
    const router = useRouter();
    const createTemplateModal = useModal('template/create-template');

    const inProcessTemplates = workouts?.filter((workout) => !workout.isDone && workout.isTemplate);

    const onResumeTemplate = () => {
        invariant(inProcessTemplates, 'inProcessTemplates is undefined');
        router.push(`/template/${inProcessTemplates[0].id}`);
        hide();
    };

    const onStartNewTemplate = () => {
        invariant(inProcessTemplates, 'inProcessTemplates is undefined');
        mutate({ workoutId: inProcessTemplates[0].id });
        hide();
        createTemplateModal.show();
    };

    return (
        <GenricDialog isOpen={visible} setIsOpen={hide}>
            <div className="flex justify-center items-center flex-col bg-slate-300 p-4 rounded-md">
                <h1>You have template still in progress. Starting new template will delete the template in progress</h1>

                <div className="flex justify-center items-center">
                    <Button onClick={onResumeTemplate}>Resume Template</Button>
                    <Button className="bg-red-500" onClick={onStartNewTemplate}>
                        Start new Template
                    </Button>
                    <Button onClick={hide}>Cancel</Button>
                </div>
            </div>
        </GenricDialog>
    );
});

export default ConfirmStartNewTemplate;
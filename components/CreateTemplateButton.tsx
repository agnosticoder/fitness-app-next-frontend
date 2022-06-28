import invariant from 'tiny-invariant';
import Button from './Button';
import useGetWorkouts from './hooks/useGetWorkouts';
import { useModal } from '@ebay/nice-modal-react';
import ConfirmStartNewTemplate from './modals/ConfrimStartNewTemplate';
import CreateTemplate from './modals/CreateTemplate';

const CreateTemplateButton = () => {
    const { data: workouts } = useGetWorkouts();
    const confirmStartNewTemplateModal = useModal('template/confirm-start-new-template');
    const createTemplateModal = useModal('template/create-template');

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

    return (
        <div>
            <div className="flex justify-center">
                <Button onClick={onCreateTemplate}>Create Template</Button>
            </div>
            <ConfirmStartNewTemplate id='template/confirm-start-new-template'/>
            <CreateTemplate id='template/create-template'/>
        </div>
    );
};

export default CreateTemplateButton;

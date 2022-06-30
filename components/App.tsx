import CreateTemplateButton from './CreateTemplateButton';
import CreateWorkoutModal from './CreateWorkoutModal';
import Template from './Template';
import WorkoutInProcess from './WorkoutInProcess';
import { useModal } from '@ebay/nice-modal-react';
import Modal from './modals/Modal';

const App = () => {
    const modal = useModal(Modal);

    return (
        <div>
            <div className="flex items-center justify-around">
                <CreateWorkoutModal />
                <CreateTemplateButton />
            </div>
            <WorkoutInProcess />
            {/* <WorkoutLinks /> */}
            <Template />
            <button
                onClick={() => modal.show()}
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
                Open dialog
            </button>
        </div>
    );
};

export default App;

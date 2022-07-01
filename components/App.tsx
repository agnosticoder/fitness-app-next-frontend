import CreateTemplateButton from './CreateTemplateButton';
import CreateWorkoutModal from './CreateWorkoutModal';
import Template from './Template';
import WorkoutInProcess from './WorkoutInProcess';
import { useModal } from '@ebay/nice-modal-react';
import Modal from './modals/Modal';
import { IoIosArrowBack } from 'react-icons/io';

const App = () => {
    const modal = useModal(Modal);

    return (
        <div>
            <div className="fixed bottom-0 left-0 right-0 z-10 h-28 flex justify-center items-center bg-zinc-700 shadow-xl">
                <div className='pb-10'>
                    <CreateWorkoutModal />
                </div>
            </div>

            <WorkoutInProcess />
            {/* <WorkoutLinks /> */}
            <Template />
            {/* <button
                onClick={() => modal.show()}
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
                Open dialog
            </button> */}
        </div>
    );
};

export default App;

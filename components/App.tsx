import { useAtom } from 'jotai';
import Button from './Button';
import CreateWorkoutModal from './CreateWorkoutModal';
import FinishedWorkouts from './FinishedWorkouts';
import GenricDialog from './GenricDialog';
import { setDialogAtom } from './store/atoms';
import WorkoutInProcess from './WorkoutInProcess';


const App = () => {
    const [, setIsDialogOpen] = useAtom(setDialogAtom);

    const onOpenDialog = () => {
        console.log('Open dialog');
        setIsDialogOpen(true);
    };

    return (
        <div>
            <div className="flex justify-center items-center flex-col">
                <h2>Your last resort for Fitness</h2>
                <CreateWorkoutModal />
                <h3 className="mb-6">History</h3>
                <Button onClick={onOpenDialog}>Open Genric Dialog</Button>
            </div>
            {/* <WorkoutLinks /> */}
            <WorkoutInProcess />
            <FinishedWorkouts />
            <GenricDialog>
                <div className="flex justify-center items-center flex-col bg-slate-300 p-4 rounded-md">
                    <h2>Are you sure to close?</h2>
                    <div className="flex justify-center items-center">
                        <Button onClick={() => setIsDialogOpen(false)}>Yes</Button>
                        <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </GenricDialog>
        </div>
    );
};

export default App;

import CreateTemplateButton from './CreateTemplateButton';
import CreateWorkoutModal from './CreateWorkoutModal';
import FinishedWorkouts from './FinishedTemplates';
import Template from './Template';
import WorkoutInProcess from './WorkoutInProcess';


const App = () => {
    return (
        <div>
            <div className="flex items-center justify-around">
                <CreateWorkoutModal />
                <CreateTemplateButton />
            </div>
            <WorkoutInProcess />
            {/* <WorkoutLinks /> */}
            <Template />
        </div>
    );
};

export default App;

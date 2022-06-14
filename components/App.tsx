import CreateWorkoutModal from './CreateWorkoutModal';
import WorkoutLinks from './WorkoutsLinks';


const App = () => {
    return (
        <div>
            <div className='flex justify-center items-center flex-col'>
                <h2>Your last resort for Fitness</h2>
                <CreateWorkoutModal />
                <h3 className='mb-6'>History</h3>
            </div>
            <WorkoutLinks />
        </div>
    );
};

export default App;

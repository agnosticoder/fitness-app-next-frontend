import CreateWorkoutModal from './CreateWorkoutModal';
import Template from './Template';
import WorkoutInProcess from './WorkoutInProcess';

const App = () => {

    return (
        <div>
            <div className='text-center my-8'>
                <CreateWorkoutModal />
            </div>

            <WorkoutInProcess />
            {/* <WorkoutLinks /> */}
            <Template />
        </div>
    );
};

export default App;

import { useEffect } from 'react';
import fetchAllExercises from '../lib/fetchAllExercises';
import CreateWorkoutModal from './CreateWorkoutModal';
import useWorkouts from './hooks/useWorkouts';
import WorkoutLinks from './WorkoutsLinks';


const App = () => {
    const workouts = useWorkouts();

    useEffect(() => {
        fetchAllExercises();
    }, []);

    return (
        <div>
            <h2>Your last resort for Fitness</h2>
            <CreateWorkoutModal />
            <h3>Past Workouts</h3>
            <WorkoutLinks workouts={workouts}/>
        </div>
    );
};

export default App;

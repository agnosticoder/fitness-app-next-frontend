import CreateWorkout from './modals/CreateWorkout';
import CreateWorkoutButton from './CreateWorkoutButton';

const CreateWorkoutModal = () => {
    return (
        <div>
            <CreateWorkout id="workout/create-workout" />
            <CreateWorkoutButton />
        </div>
    );
};

export default CreateWorkoutModal;

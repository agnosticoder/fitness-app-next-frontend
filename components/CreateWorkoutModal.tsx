import CreateWorkoutDialog from './modals/CreateWorkout';
import CreateWorkoutButton from './CreateWorkoutButton';

const CreateWorkoutModal = () => {
    return (
        <div>
            <CreateWorkoutDialog id='workout/create-workout'/>
            <CreateWorkoutButton />
        </div>
    );
};

export default CreateWorkoutModal;

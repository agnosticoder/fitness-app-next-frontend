import { Workout } from "./hooks/useGetWorkout";

const ExercisesOverview = ({workout}: {workout: Workout}) => {

    const workoutOverview = workout?.exercises.map((exercise) => (
        <div key={exercise.id} className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <div className="text-center">
                    <h1>
                        <span>
                            {exercise.sets.length} X {exercise.name}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    ));


    console.log('workout', workout);

    return (
        <div className="mb-4">
            {workoutOverview}
        </div>
    );
};

export default ExercisesOverview;
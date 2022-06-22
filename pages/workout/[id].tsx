import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import getWorkout from "../../lib/getWorkout";
import AddExercisesModal from '../../components/AddExercisesModal';
import Exercise from '../../components/Exercise';
import FinishWorkoutButton from "../../components/FinishWorkoutButton";
import CancelWorkoutButton from "../../components/CancelWorkoutButton";

export interface Set {
    id: string;
    weight: string;
    reps: string;
    setOrder: string | null;
    isDone: boolean;
    exerciseId: string;
}

export interface Exercise {
    id: string;
    name: string;
    workoutId: string;
    sets: Set[];
}

export interface Workout {
    id: string;
    name: string;
    isDone: boolean;
    exercises: Exercise[];
}

export const getServerSideProps:GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;

    const workout = await getWorkout(id) as Workout;

    if (!workout) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...workout,
        },
    };
};

const Workout = (workout: Workout) => {

    console.log('exercises', workout.exercises);

    return (
        <div>
            <div className="flex justify-between">
                <AddExercisesModal workoutId={workout.id} />
                <FinishWorkoutButton {...workout}/>
                <CancelWorkoutButton workoutId={workout.id}/>
            </div>
            <h2>Workout: {workout.name}</h2>
            {/*//Todo: Add functionality to create custom exercises */}
            {/* <AddExercise id={id} /> */}
            <div className="grid grid-cols-2 gap-2">
                {workout.exercises?.map((exercise: any) => (
                    <Exercise key={exercise.id} {...exercise} />
                ))}
            </div>
        </div>
    );
};

export default Workout;


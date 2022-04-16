import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import AddExercise from "../../components/AddExercise";
import { WorkoutHeading } from "../../components/hooks/useWorkouts";
import getWorkout from "../../lib/getWorkout";

export interface Exercise{
    id: string,
    name: string,
    reps: number,
    setOrder: number,
    weight: number
}

interface Workout extends WorkoutHeading{
    exercises: Exercise[]
}

const Workout = (workout: Workout) => {
    console.log(workout.id, workout.exercises, workout.name);

    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h2>Workout: {workout.name}</h2>
            <AddExercise id={workout.id}/>
            {workout.exercises.map((e) => (
                <div key={e.id}>
                    <ul>
                        <li>Name: {e.name}</li>
                        <li>Set: {e.setOrder}</li>
                        <li>Reps: {e.reps}</li>
                        <li>Weight(lbs): {e.weight}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Workout;


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;
    const workout = await getWorkout(id);
    return {
        props: {
            ...workout,
        },
    };
};
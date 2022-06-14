import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import getWorkout from "../../lib/getWorkout";
import AddExercisesModal from '../../components/AddExercisesModal';
import { Workout } from '../../lib/interfaces/Workout';
import Exercise from '../../components/Exercise';

export const getServerSideProps:GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;

    const workout = await getWorkout<Workout>(id);
    
    if(!workout) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            ...workout
        }
    };
    
};

const Workout = ({id, name, exercises}:Workout) => {
    console.log('Workout', id, name, exercises);

    const router = useRouter();

    return (
        <div>
            <AddExercisesModal workoutId={id}/>
            <h2>Workout: {name}</h2>
            {/*//Todo: Add functionality to create custom exercises */}
            {/* <AddExercise id={id} /> */}
            <div className="grid grid-cols-2 gap-2">
                {exercises?.map(exercise => <Exercise key={exercise.id} {...exercise}/>)}
            </div>
        </div>
    );
};

export default Workout;


import Link from "next/link";
import Button from './Button';
import useDeleteWorkout from './hooks/useDeleteWorkout';
import useGetWorkouts from './hooks/useGetWorkouts';

export interface WorkoutHeading{
    id: string,
    name: string
}

const WorkoutLinks = () => {
    const {isLoading, data:workouts} = useGetWorkouts();
    const {mutate} = useDeleteWorkout();

    const onDeleteWorkout = async (workoutId: string) => {
        mutate({workoutId});
    };

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul className="mb-20 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {workouts && workouts.map((workout) => (
                        <div key={workout.id}>
                            <div className="aspect-w-1 aspect-h-1">
                                <Link href={`/workout/${workout.id}`}>
                                    <a className="nav-link flex justify-center items-center bg-slate-500/70 rounded-lg hover:bg-slate-500 hover:text-slate-200 text-xl">
                                        {workout.name}
                                    </a>
                                </Link>
                            </div>
                            <Button className='block mx-auto' onClick={() => onDeleteWorkout(workout.id)}>Delete</Button>
                        </div>
                    ))}
                </ul>
            )
            }
        </div>
    );
}

export default WorkoutLinks;
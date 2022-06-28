import Link from "next/link";
import useGetWorkouts from "./hooks/useGetWorkouts";

const WorkoutInProcess = () => {
    const { isLoading, data: workouts } = useGetWorkouts();

    const inProcessWorkouts = workouts?.filter((workout) => !workout.isDone && !workout.isTemplate);

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (

                <div>
                    <h1 className="text-center text-2xl">Workout In Process</h1>
                    <ul className="mb-20 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {inProcessWorkouts &&
                            inProcessWorkouts.map((workout) => (
                                <div key={workout.id}>
                                    <div className="aspect-w-1 aspect-h-1">
                                        <Link href={`/workout/${workout.id}`}>
                                            <a className="nav-link flex justify-center items-center bg-orange-500/70 rounded-lg hover:bg-orange-500 hover:text-orange-200 text-xl">
                                                {workout.name}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default WorkoutInProcess;
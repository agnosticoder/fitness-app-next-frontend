import Link from "next/link";
import useGetWorkouts from "./hooks/useGetWorkouts";

const FinishedWorkouts = () => {
    const { isLoading, data: workouts } = useGetWorkouts();

    const finishedWorkouts = workouts?.filter((workout) => workout.isDone);

    return (
        <div>
            <h1 className='text-center text-2xl'>Finished Workouts</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul className="mb-20 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {finishedWorkouts &&
                        finishedWorkouts.map((workout) => (
                            <div key={workout.id}>
                                <div className="aspect-w-1 aspect-h-1">
                                    <Link href={`/workout/${workout.id}`}>
                                        <a className="nav-link flex justify-center items-center bg-green-500/70 rounded-lg hover:bg-green-500 hover:text-green-200 text-xl">
                                            {workout.name}
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default FinishedWorkouts;
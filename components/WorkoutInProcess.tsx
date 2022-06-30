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
                    {inProcessWorkouts &&
                        inProcessWorkouts.map((workout) => (
                            <div key={workout.id}>
                                <Link href={`/workout/${workout.id}`}>
                                    <a className="fixed bottom-36 right-4 text-orange-100 italic bg-orange-500 text-sm font-bold rounded-lg p-2 z-10 shadow-md shadow-orange-700/40">
                                        <div className="relative flex items-center justify-center gap-1">
                                            <span>Workout In Progress {workout.name}</span>
                                            <span className="absolute -top-4 -right-3 h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
};

export default WorkoutInProcess;
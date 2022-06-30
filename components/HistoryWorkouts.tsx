import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import HistoryWorkoutMenu from "./HistoryWorkoutMenu";
import useGetWorkouts, { Set } from "./hooks/useGetWorkouts";

const HistoryWorkouts = () => {
    const { data: workouts } = useGetWorkouts();

    const onlyWorkouts = workouts?.filter((workout) => workout.isDone && !workout.isTemplate);

    const bestSet = (sets: Set[]) => {
        let bestSet = sets[0];
        sets.forEach(set => {
            if(+set.weight * +set.reps > +bestSet.weight * +bestSet.reps) {
                bestSet = set;
            }
        });
        return bestSet;
    }

    return (
        <div>
            {/* Top header with back button */}
            <Link href="/">
                <a className="fixed top-2 left-2 right-0 z-10 flex justify-between items-center">
                    <IoIosArrowBack size={35} />
                </a>
            </Link>
            <ul className="mb-20 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {onlyWorkouts?.map((workout) => (
                    <div key={workout.id}>
                        <div className="aspect-w-1 aspect-h-1">
                            <div>{workout.name}</div>
                            <div className="nav-link flex flex-col justify-center items-center bg-green-500/70 rounded-lg text-xl">
                            <HistoryWorkoutMenu workoutId={workout.id} />
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th>Excercise</th>
                                            <th>Best Set</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                    {workout.exercises.map((exercise) => (
                                            <tr key={exercise.id}>
                                                <td>
                                                    <span>{exercise.sets.length} X </span>
                                                    {exercise.name}
                                                </td>
                                                <td>
                                                    {bestSet(exercise.sets).weight}kg x {bestSet(exercise.sets).reps}
                                                </td>
                                            </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default HistoryWorkouts;
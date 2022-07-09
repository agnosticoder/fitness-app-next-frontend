import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import HistoryWorkoutMenu from "./HistoryWorkoutMenu";
import useGetWorkouts, { Set } from "./hooks/useGetWorkouts";
import { useModal } from "@ebay/nice-modal-react";
import WorkoutHisory from "./modals/WorkoutHistory";

const HistoryWorkouts = () => {
    const { data: workouts } = useGetWorkouts();
    const workoutHistoryModal = useModal(WorkoutHisory);

    const onlyWorkouts = workouts?.filter((workout) => workout.isDone && !workout.isTemplate);

    const bestSet = (sets: Set[]) => {
        let bestSet = sets[0];
        sets.forEach((set) => {
            if (+set.weight * +set.reps > +bestSet.weight * +bestSet.reps) {
                bestSet = set;
            }
        });
        return bestSet;
    };

    const onShowWorkoutHistory = ({ workoutId }: { workoutId: string }) => {
        workoutHistoryModal.show({ workoutId });
    };

    return (
        <div>
            {/* Top header with back button */}
            <Link href="/">
                <a className="fixed top-5 standalone:top-[50px] left-2 right-0 z-10 flex justify-between items-center">
                    <IoIosArrowBack size={35} />
                </a>
            </Link>
            <ul className="mb-20">
                {onlyWorkouts?.map((workout) => (
                    <div key={workout.id}>
                        <div className=" relative block mb-4 p-2 mx-auto w-full sm:w-96 text-zinc-300/80 bg-zinc-600 rounded-lg">
                            <button className="block w-full min-h-[180px]" onClick={() => onShowWorkoutHistory({ workoutId: workout.id })}>
                                <div className="flex flex-col justify-center">
                                    <div className="mr-10 text-left text-xl text-zinc-100 font-bold mb-2">
                                        {workout.name}
                                    </div>
                                    <table className="w-full table-auto text-left">
                                        <thead>
                                            <tr>
                                                <th>Excercise</th>
                                                <th>Best Set</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-left font-normal text-sm">
                                            {workout.exercises.map((exercise) => (
                                                <tr key={exercise.id}>
                                                    <td>
                                                        <span>{exercise.sets.length} X </span>
                                                        {exercise.name}
                                                    </td>
                                                    <td>
                                                        {bestSet(exercise.sets).weight}kg x{' '}
                                                        {bestSet(exercise.sets).reps}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </button>
                            <HistoryWorkoutMenu workoutId={workout.id} />
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default HistoryWorkouts;
import Link from "next/link";
import { WorkoutHeading } from "./hooks/useWorkouts";

const WorkoutLinks = ({workouts}:{workouts: WorkoutHeading[]}) => {
    return (
        <div>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout.id}>
                        <Link href={`/workout/${workout.id}`}>
                            <a className="nav-link">{workout.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutLinks;
import { useEffect, useState } from "react";

const fetchWorkouts = async () => {
    try{
        const result = await  fetch('http://localhost:8000/workouts');
        if(result.ok){
            const workouts = await result.json();
            console.log({workouts});
            return workouts;
        }
    }catch(err){
        console.warn({err});
    }
}

export interface WorkoutHeading{
    id: string,
    name: string
}

const useWorkouts = () => {
    const [workouts, setWorkouts] = useState<WorkoutHeading[]>([]);

    useEffect(() => {
        fetchWorkouts()
            .then((workouts) => setWorkouts(workouts))
            .catch((e) => console.error(e));
    }, []);

    return workouts;
}

export default useWorkouts;
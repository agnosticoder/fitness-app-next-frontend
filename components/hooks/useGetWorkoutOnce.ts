import { useEffect, useState } from "react";
import { config } from "../../config/config";

const useGetWorkoutOnce = ({id}:{id: string}) => {
    const [workout, setWorkout] = useState();

    const fetchWorkout = async () => {
        const res = await fetch(`${config.apiUrl}/workout/${id}`)
        const {data, code} = await res.json();
        return data;
    };

    useEffect(() => {
        fetchWorkout().then(data => setWorkout(data));
    }, [id]);

    return {workout}
}

export default useGetWorkoutOnce;
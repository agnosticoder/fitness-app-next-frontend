import { config } from "../config/config"

const getWorkout = async <T>(id: string) => {
    const result = await fetch(`${config.apiUrl}/workout/${id}`);
    if (result.ok) {
        const { data } = (await result.json()) as { data: T; code: number };
        return data;
    }
};

export default getWorkout;
